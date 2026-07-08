import { test, expect } from '../fixtures';  // ← from fixtures, not @playwright/test
import { HomePage } from '../pages/HomePage';

test.describe('Home Page', () => {

  test('should have correct title @smoke', async ({ page, homePage }) => {
    await expect(page).toHaveTitle(/Practice Software Testing/);
  });

  test('should search for a product', async ({ page, homePage }) => {
    await homePage.searchForProduct('pliers');
    await expect(page.getByText('Pliers')).toBeVisible();
  });

  test('button should be visible', async ({ page, homePage }) => {
    await homePage.clickFirstProduct();
    const addToCartButton = page.locator('[data-test="add-to-cart"]');
    await addToCartButton.scrollIntoViewIfNeeded();
    await expect(addToCartButton).toBeVisible();
  });

});
    // test('heading 3 should be visible', async({page})=>{
    //     await page.locator('a.card').first().click();
    //     const addToCartButton = page.locator('[data-test="add-to-cart"]');
    //     await addToCartButton.scrollIntoViewIfNeeded();
    //     await expect(page.getByRole('heading', {level:3})).toBeVisible();
    // });
    // test('table should be visible', async ({ page }) => {
    // await page.getByPlaceholder('Search').fill('Combination Pliers');
    // await page.getByRole('button', { name: 'Search' }).click();
    // await page.getByText('Combination Pliers').first().click();
    // await page.waitForLoadState('domcontentloaded');
    // const productSpecs = page.locator('[data-test="product-specs"]');
    // await productSpecs.scrollIntoViewIfNeeded();
    // await expect(productSpecs).toBeVisible();
    //     });
 