import { expect, test } from "@playwright/test";
import { SAMPLE } from "../src/data/sample";

test("North/South Node control opens the pair and handles missing positions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "North / South Node" })
    .click();
  await expect(page).toHaveURL(/#nodes$/);
  await expect(page.locator("#page-title")).toHaveText(
    "North Node ↔ South Node",
  );
  await expect(page.locator(".node-pair-card .placement-reading")).toHaveCount(
    2,
  );
  await expect(page.locator(".reference-page .notice").first()).toContainText(
    "illustrative example",
  );
  await page.reload();
  await expect(page.locator("#page-title")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: "/tmp/astrodice-nodes-mobile.png" });
  await page.evaluate((sample) => {
    localStorage.setItem(
      "natal-axis-reader.chart.v1",
      JSON.stringify({
        ...sample,
        name: "My node chart",
        planets: sample.planets.filter((p) => p.name !== "South Node"),
      }),
    );
  }, SAMPLE);
  await page.reload();
  await expect(page.locator(".reference-page .notice").first()).toHaveText(
    "Node placements from My node chart.",
  );
  await expect(
    page.getByText("No South Node position was entered in this chart."),
  ).toBeVisible();
  await expect(page.locator(".node-pair-card .placement-reading")).toHaveCount(
    1,
  );
});

test("each die opens its own house pair page with refresh and back navigation", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto("/");
  for (let axis = 1; axis <= 6; axis++) {
    await page
      .getByRole("button", {
        name: `Die face ${axis}: explore houses ${axis} and ${axis + 6}`,
      })
      .click();
    await expect(page).toHaveURL(new RegExp(`#axis/${axis}$`));
    await expect(page.locator("#page-title")).toHaveText(
      `Houses ${axis} ↔ ${axis + 6}`,
    );
    await expect(page.locator(".axis-card")).toHaveCount(1);
    await expect(
      page.locator(".axis-page-readings > .detail-pair > .house-reading"),
    ).toHaveCount(2);
    await page.getByRole("button", { name: "Full chart" }).click();
  }
  await page.goto("/#axis/4");
  await page.reload();
  await expect(page.locator("#page-title")).toHaveText("Houses 4 ↔ 10");
  await page
    .getByRole("navigation", { name: "Choose a house axis" })
    .getByRole("link", { name: "5 ↔ 11" })
    .click();
  await expect(page.locator("#page-title")).toHaveText("Houses 5 ↔ 11");
  await page.goBack();
  await expect(page.locator("#page-title")).toHaveText("Houses 4 ↔ 10");
  await page.getByRole("button", { name: "Practice this axis" }).click();
  await expect(page).toHaveURL(/#dice$/);
  await expect(
    page.getByRole("button", { name: "Dice practice", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("planet dropdown explores all twelve signs and works on tablet and mobile", async ({
  page,
}) => {
  for (const width of [1194, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    const summary = page.locator(".planet-dropdown > summary");
    await summary.click();
    await expect(page.locator(".planet-menu a")).toHaveCount(10);
    await expect(page.locator(".planet-menu")).not.toContainText("North Node");
    await summary.focus();
    await page.keyboard.press("Escape");
    await expect(page.locator(".planet-menu")).toBeHidden();
    await summary.click();
    await page
      .locator(".planet-menu")
      .getByRole("link", { name: /Mercury/ })
      .click();
    await expect(page.locator("#page-title")).toContainText(
      "Mercury through the signs",
    );
    await expect(page.locator(".planet-sign-card")).toHaveCount(12);
    await page
      .getByRole("navigation", { name: "Jump to a sign" })
      .getByRole("link", { name: "Leo", exact: false })
      .click();
    await expect(page).toHaveURL(/#planet\/Mercury\/Leo$/);
    await expect(page.locator("#sign-Leo")).toBeInViewport();
    await page.reload();
    await expect(page.locator("#sign-Leo")).toBeInViewport();
    await page.getByRole("button", { name: "Switch to dark mode" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({ path: `/tmp/astrodice-planets-${width}.png` });
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Your chart", exact: true })
      .click();
    await expect(page.locator(".wheel-workspace")).toBeVisible();
  }
});
