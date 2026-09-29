import { expect, test } from "@playwright/test";
import { SAMPLE } from "../src/data/sample";

test("explore, edit, persist, switch views, and clear a chart", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator(".axis-card")).toHaveCount(6);
  await page.locator(".axis-card").nth(2).locator("summary").click();
  await expect(
    page
      .locator(".axis-card")
      .nth(2)
      .getByText("Taurus", { exact: false })
      .last(),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Architecture", exact: false })
    .click();
  await expect(page.locator(".architecture-card")).toHaveCount(6);
  await expect(
    page.locator(".architecture-card").nth(3).getByText("4 planets · 1 point"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Edit chart" }).click();
  await page.getByLabel("Chart name").fill("My saved chart");
  await page.getByRole("button", { name: "Unfold my chart" }).click();
  await expect(
    page.getByRole("heading", { name: "My saved chart" }),
  ).toBeVisible();
  const stored = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("natal-axis-reader.chart.v1")!),
  );
  expect(stored.cusps).toEqual(SAMPLE.cusps);
  expect(stored.planets).toEqual(SAMPLE.planets);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "My saved chart" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Clear saved chart" }).click();
  await expect(
    page.getByRole("heading", { name: "The example chart" }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByText("Illustrative example", { exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("manual entry validates cusp order and accepts a chart with unknown bodies", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Enter your chart" }).click();
  for (let i = 1; i <= 12; i++) {
    await page
      .getByLabel(`House ${i} sign`, { exact: true })
      .selectOption(String(i - 1));
    await page.getByLabel(`House ${i} degrees`, { exact: true }).fill("0");
  }
  for (const checkbox of await page.getByRole("checkbox").all())
    await checkbox.uncheck();
  await page.getByLabel("House 2 sign", { exact: true }).selectOption("0");
  await page.getByRole("button", { name: "Unfold my chart" }).click();
  await expect(page.getByRole("alert")).toContainText(
    "House cusps must be distinct",
  );
  await page.getByLabel("House 2 sign", { exact: true }).selectOption("1");
  await page.getByRole("button", { name: "Unfold my chart" }).click();
  await expect(
    page.getByRole("heading", { name: "My chart", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("No intercepted signs in this chart."),
  ).toBeVisible();
  await expect(
    page.getByText("No planets entered", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Not entered:", { exact: false })).toBeVisible();
});

test("mobile, keyboard expansion, reduced motion, and corrupt storage recovery", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() =>
    localStorage.setItem("natal-axis-reader.chart.v1", "{broken"),
  );
  await page.goto("/");
  await expect(page.getByRole("status")).toContainText("could not be loaded");
  const summary = page.locator(".axis-card summary").first();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".axis-card").first()).toHaveAttribute("open", "");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: "/tmp/natal-axis-mobile.png", fullPage: true });
  await page.getByRole("button", { name: "Edit chart" }).click();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "/tmp/natal-axis-input-mobile.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 320, height: 640 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("desktop visual smoke check", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "/tmp/natal-axis-desktop.png",
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
