import { expect, test } from "@playwright/test";

async function enterBirth(page: import("@playwright/test").Page) {
  await page.locator(".brand").click();
  await page.getByRole("button", { name: "Enter birth details" }).click();
  await page.getByLabel("Birth date", { exact: true }).fill("1990-05-17");
  await page.getByLabel("Local birth time", { exact: true }).fill("14:35");
  await page
    .getByText("Enter coordinates and timezone instead", { exact: true })
    .click();
  await page.getByLabel("Latitude", { exact: true }).fill("40.7128");
  await page.getByLabel("Longitude", { exact: true }).fill("-74.006");
  await page
    .getByLabel("IANA timezone", { exact: true })
    .fill("America/New_York");
  await page.getByRole("button", { name: "Use this location" }).click();
}

test("birth details → full wheel → integrated reading → all six dice faces → persistence", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await enterBirth(page);
  await page.getByLabel("Remember this chart on this device").check();
  await page.getByRole("button", { name: "Calculate my chart" }).click();
  await expect(
    page.getByRole("heading", { name: "Your birth chart", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".wheel-planet")).toHaveCount(12);
  await expect(page.locator(".wheel-house")).toHaveCount(12);
  await page
    .locator(".wheel-planet")
    .filter({ has: page.locator("text") })
    .first()
    .focus();
  await page.keyboard.press("Enter");
  await expect(
    page
      .locator(".wheel-reading")
      .getByText("Putting it together", { exact: true }),
  ).toBeVisible();
  const before = await page.evaluate(() =>
    localStorage.getItem("natal-axis-reader.chart.v1"),
  );
  if (await page.getByRole("button", { name: "Try the example" }).isVisible())
    await page.getByRole("button", { name: "Try the example" }).click();
  await page
    .getByRole("button", { name: "Dice practice", exact: false })
    .click();
  for (let face = 1; face <= 6; face++) {
    await page
      .getByRole("button", {
        name: `Face ${face}: houses ${face} and ${face + 6}`,
        exact: true,
      })
      .click();
    await expect(page.locator(".roll-result")).toContainText(
      `Houses ${face} ↔ ${face + 6}`,
    );
    await expect(page.getByTestId("practice-answer")).toHaveCount(0);
    await page
      .getByRole("button", { name: "Reveal placements & meanings" })
      .click();
    await expect(page.getByTestId("practice-answer")).toBeVisible();
    await expect(page.locator(".practice-houses .house-summary")).toHaveCount(
      2,
    );
  }
  expect(
    await page.evaluate(() =>
      localStorage.getItem("natal-axis-reader.chart.v1"),
    ),
  ).toBe(before);
  await page.getByRole("button", { name: "Explore this axis" }).click();
  await expect(page.locator("#page-title")).toHaveText("Houses 6 ↔ 12");
  await page.getByRole("button", { name: "Full chart" }).click();
  await expect(page.locator(".wheel-house.axis-highlight")).toHaveCount(2);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Your birth chart", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Edit birth details" }).click();
  await expect(page.getByLabel("Birth date", { exact: true })).toHaveValue(
    "1990-05-17",
  );
  await page.getByLabel("Local birth time", { exact: true }).fill("18:35");
  await page.getByRole("button", { name: "Calculate my chart" }).click();
  await expect(
    page.getByText("This session only", { exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("natal-axis-reader.chart.v1"),
    ),
  ).toBeNull();
  await page.getByRole("button", { name: "Clear saved chart" }).click();
  await expect(
    page.getByRole("heading", { name: "The example chart", exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("unknown time never creates a chart; city failures and draft return are recoverable", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Enter birth details" }).click();
  await page.getByLabel("Birth date", { exact: true }).fill("1985-06-01");
  await page.getByLabel("I don’t know my birth time").check();
  await expect(
    page.getByRole("button", { name: "Calculate my chart" }),
  ).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("won’t invent");
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  await page.getByRole("button", { name: "Enter birth details" }).click();
  await expect(page.getByLabel("Birth date", { exact: true })).toHaveValue(
    "1985-06-01",
  );
  await page.route("https://geocoding-api.open-meteo.com/**", (r) =>
    r.fulfill({ status: 503, body: "unavailable" }),
  );
  await page.getByLabel("Birth city or town").fill("Springfield");
  await page.getByRole("button", { name: "Find city" }).click();
  await expect(page.getByRole("alert")).toContainText(
    "City search could not finish",
  );
});

test("place search exposes choices, sends no birth time, and resolves the selected place", async ({
  page,
}) => {
  await page.route("https://geocoding-api.open-meteo.com/**", (route) => {
    expect(route.request().url()).not.toContain("1990");
    return route.fulfill({
      json: {
        results: [
          {
            name: "New York",
            admin1: "New York",
            country: "United States",
            latitude: 40.7128,
            longitude: -74.006,
            timezone: "America/New_York",
          },
        ],
      },
    });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Enter birth details" }).click();
  await page.getByLabel("Birth date", { exact: true }).fill("1990-05-17");
  await page.getByLabel("Local birth time", { exact: true }).fill("14:35");
  await page.getByLabel("Birth city or town").fill("New York");
  await page.getByRole("button", { name: "Find city" }).click();
  await page
    .getByRole("button", {
      name: "New York, New York, United States",
      exact: false,
    })
    .click();
  await page.getByRole("button", { name: "Calculate my chart" }).click();
  await expect(
    page.getByRole("heading", { name: "Your birth chart", exact: true }),
  ).toBeVisible();
});

test("wheel, reading, birth form, and dice fit a narrow viewport with reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.screenshot({
    path: "/tmp/astrodice-wheel-mobile.png",
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  if (await page.getByRole("button", { name: "Try the example" }).isVisible())
    await page.getByRole("button", { name: "Try the example" }).click();
  await page
    .getByRole("button", { name: "Dice practice", exact: false })
    .click();
  await page.getByRole("button", { name: "Roll the die", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Reveal placements & meanings" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Reveal placements & meanings" })
    .click();
  await expect(page.getByTestId("practice-answer")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "/tmp/astrodice-practice-mobile.png",
    fullPage: true,
  });
  await enterBirth(page);
  await page.setViewportSize({ width: 320, height: 640 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("desktop wheel and dice visual review", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.screenshot({
    path: "/tmp/astrodice-wheel-desktop.png",
    fullPage: true,
  });
  if (await page.getByRole("button", { name: "Try the example" }).isVisible())
    await page.getByRole("button", { name: "Try the example" }).click();
  await page
    .getByRole("button", { name: "Dice practice", exact: false })
    .click();
  await page
    .getByRole("button", { name: "Face 4: houses 4 and 10", exact: true })
    .click();
  await page.screenshot({
    path: "/tmp/astrodice-dice-desktop.png",
    fullPage: true,
  });
});
