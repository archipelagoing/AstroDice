import { expect, test } from "@playwright/test";
import { SAMPLE } from "../src/data/sample";

test("welcome roll previews an example and saved charts bypass the welcome", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".welcome-page")).toBeVisible();
  await expect(page.locator(".chart-section")).toHaveCount(0);
  await page.getByRole("button", { name: "Try a roll", exact: true }).click();
  await expect(page.locator(".welcome-preview .eyebrow").first()).toContainText(
    /Face [1-6]/,
  );
  await expect(page.locator(".welcome-preview .house-summary")).toHaveCount(2);
  await page.getByRole("button", { name: "Try the example" }).click();
  await expect(page.locator(".welcome-page")).toHaveCount(0);
  await expect(page.locator(".wheel-workspace")).toBeVisible();
  await page.evaluate(
    (sample) =>
      localStorage.setItem(
        "natal-axis-reader.chart.v1",
        JSON.stringify({ ...sample, name: "Returning chart" }),
      ),
    SAMPLE,
  );
  await page.goto("/");
  await expect(page.locator("#chart-title")).toHaveText("Returning chart");
  await expect(page.locator(".welcome-page")).toHaveCount(0);
  await page.locator(".brand").click();
  await expect(page.locator(".welcome-page")).toBeVisible();
});

test("phone wheel and reader share selection; enlarged picker scrolls without clipping", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#chart");
  await expect(page.locator(".natal-wheel")).toBeVisible();
  const sun = page.locator(".placement-grid button").filter({ hasText: "Sun" });
  await sun.click();
  await expect(sun).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".wheel-reading")).toBeVisible();
  await expect(page.locator(".mobile-placement-heading")).toContainText("Sun");
  await page.getByRole("button", { name: "Wheel", exact: true }).click();
  await expect(page.locator(".wheel-planet.selected")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Read placement", exact: true })
    .click();
  await expect(page.locator(".wheel-reading h3").first()).toContainText("Sun");
  await page.getByLabel("Text size", { exact: true }).selectOption("larger");
  await page.locator(".planet-dropdown > summary").click();
  await expect(
    page.getByRole("button", { name: "Close chooser" }),
  ).toBeVisible();
  expect(
    await page
      .locator(".planet-menu")
      .evaluate((el) => getComputedStyle(el).overflowY),
  ).toBe("auto");
  expect(
    await page
      .locator(".header-sign-options a")
      .first()
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
  ).toBeGreaterThanOrEqual(16);
  await page
    .locator(".header-sign-options")
    .getByRole("link", { name: "Pisces", exact: true })
    .click();
  await expect(page.locator(".planet-sign-card")).toHaveCount(1);
  await expect(page.locator(".planet-sign-card h2")).toContainText("Pisces");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("recall cards conceal chart answers until reveal and reset for another face", async ({
  page,
}) => {
  await page.goto("/#dice");
  await page
    .getByRole("button", { name: "Face 4: houses 4 and 10", exact: true })
    .click();
  const cards = page.locator(".recall-card .house-summary");
  await expect(cards).toHaveCount(2);
  await expect(page.locator(".recall-card .house-span")).toHaveCount(0);
  await expect(page.locator(".recall-card")).not.toContainText("Cusp sign");
  await page
    .getByRole("button", { name: "Reveal placements & meanings" })
    .click();
  await expect(page.locator(".practice-answer .house-span")).toHaveCount(2);
  await page
    .getByRole("group", { name: "House reading focus" })
    .getByRole("button", { name: "House 10", exact: true })
    .click();
  await expect(
    page.locator(".practice-answer .house-reading").first(),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Face 1: houses 1 and 7", exact: true })
    .click();
  await expect(page.locator(".practice-answer")).toHaveCount(0);
  await expect(page.locator(".recall-card .house-span")).toHaveCount(0);
});
