import { expect, test } from "@playwright/test";

test("dice branding, compact header, and direct Sabian reader", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Astro-Dice/);
  await expect(page.locator(".hero-face")).toHaveCount(6);
  const header = page.locator(".site-header");
  const height = (await header.boundingBox())!.height;
  await page.evaluate(() => window.scrollTo(0, 400));
  await expect(header).toHaveClass(/is-compact/);
  await expect
    .poll(async () => (await header.boundingBox())!.height)
    .toBeLessThan(height);
  expect((await header.boundingBox())!.y).toBe(0);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(header).not.toHaveClass(/is-compact/);
  await page
    .getByRole("button", { name: "Die face 3: explore houses 3 and 9" })
    .click();
  await expect(page.locator("#page-title")).toHaveText("Houses 3 ↔ 9");
  await page.getByRole("button", { name: "Full chart" }).click();
  const card = page.locator(".wheel-reading .sabian-card").first();
  const sign = await card.locator('input[name="selected_symbol"]').inputValue();
  const degree = await card
    .locator('input[name="selected_degree"]')
    .inputValue();
  let submitted = "";
  await page.route(
    "https://sabiansymbols.com/list-of-symbols/**",
    async (route) => {
      submitted = route.request().postData() ?? "";
      await route.fulfill({
        contentType: "text/html",
        body: "<h1>Official reader fixture</h1>",
      });
    },
  );
  await card.getByRole("button", { name: "Read symbol" }).click();
  await expect(card.frameLocator("iframe").getByRole("heading")).toHaveText(
    "Official reader fixture",
  );
  expect(new URLSearchParams(submitted).get("selected_symbol")).toBe(sign);
  expect(new URLSearchParams(submitted).get("selected_degree")).toBe(degree);
  expect([...new URLSearchParams(submitted).keys()]).toEqual([
    "selected_symbol",
    "selected_degree",
  ]);
  await card.getByRole("button", { name: "Close reader" }).click();
  await expect(card.locator("iframe")).toBeHidden();
});

test("mobile compact header respects reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, 350));
  await expect(page.locator(".site-header")).toHaveClass(/is-compact/);
  expect(
    await page
      .locator(".site-header")
      .evaluate((el) => getComputedStyle(el).transitionDuration),
  ).toBe("0s");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
