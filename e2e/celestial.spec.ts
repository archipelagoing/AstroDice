import { expect, test } from "@playwright/test";

test("cream and navy deck surfaces, larger text, and persisted preference", async ({
  page,
}) => {
  await page.goto("/#nodes");
  await expect(page.locator(".node-pair-card").first()).toHaveCSS(
    "background-color",
    "rgb(255, 247, 232)",
  );
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(245, 238, 223)",
  );
  await expect(
    page.locator(".node-pair-card > .celestial-medallion"),
  ).toHaveCount(2);
  const paragraph = page.locator(".reading-synthesis p").first();
  await expect(paragraph).toHaveCSS("font-size", "19px");
  await page.getByLabel("Text size", { exact: true }).selectOption("larger");
  await expect(paragraph).toHaveCSS("font-size", "22px");
  await page.reload();
  await expect(page.getByLabel("Text size", { exact: true })).toHaveValue(
    "larger",
  );
  await expect(paragraph).toHaveCSS("font-size", "22px");
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(23, 43, 77)",
  );
  await expect(page.locator(".node-pair-card").first()).toHaveCSS(
    "background-color",
    "rgb(34, 59, 96)",
  );
  await page.screenshot({ path: "/tmp/astrodice-celestial-night.png" });
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await page.screenshot({ path: "/tmp/astrodice-celestial-clouds.png" });
});

test("chart selection, local view, and reading position survive destination changes", async ({
  page,
}) => {
  await page.goto("/#chart");
  await page
    .locator(".placement-grid button")
    .filter({ hasText: "Sun" })
    .click();
  const title = await page.locator(".wheel-reading h3").textContent();
  await page
    .locator(".wheel-reading .reading-example")
    .scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  const position = await page.evaluate(() => window.scrollY);
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  // Click the visible sticky control without Playwright scrolling its ancestor first.
  const nodeControl = (await navigation
    .getByRole("link", { name: "North / South Node" })
    .boundingBox())!;
  await page.mouse.click(
    nodeControl.x + nodeControl.width / 2,
    nodeControl.y + nodeControl.height / 2,
  );
  await expect(page.locator("#page-title")).toHaveText(
    "North Node ↔ South Node",
  );
  await navigation
    .getByRole("link", { name: "Your chart", exact: true })
    .click();
  await expect(page.locator(".wheel-reading h3")).toHaveText(title!);
  await expect
    .poll(async () =>
      Math.abs((await page.evaluate(() => window.scrollY)) - position),
    )
    .toBeLessThan(6);
  await page.getByRole("button", { name: "Architecture" }).click();
  await navigation.getByRole("link", { name: "North / South Node" }).click();
  await navigation
    .getByRole("link", { name: "Your chart", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Architecture" }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("celestial cards and dice navigation fit small screens and text enlargement", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#nodes");
  await page.getByLabel("Text size", { exact: true }).selectOption("larger");
  await expect(page.locator(".brand-subtitle")).toBeHidden();
  await expect(page.locator(".nav-die-emblem")).toHaveCount(4);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: "/tmp/astrodice-celestial-mobile.png" });
  await page.setViewportSize({ width: 320, height: 640 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.setViewportSize({ width: 640, height: 900 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, 350));
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
