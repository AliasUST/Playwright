import { test, expect } from '../../src/fixtures/base';

test.describe('SauceDemo storefront', () => {
  test('Inventory sorting and product detail navigation work', async ({ page }) => {
    // 1. Log in with `standard_user` and `secret_sauce`.
    await page.goto('https://www.saucedemo.com');
    await page.locator('input[placeholder="Username"]').fill('standard_user');
    await page.locator('input[placeholder="Password"]').fill('secret_sauce');
    await page.locator('#login-button').click();
    page.pause

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();

    // 2. Change the Sort products control from Name (A to Z) to Price (low to high).
    const sortSelect = page.locator('select[data-test="product-sort-container"]');
    await sortSelect.selectOption('lohi');

    const productNames = page.locator('.inventory_item_name');
    await expect(productNames.nth(0)).toHaveText('Sauce Labs Onesie');
    await expect(productNames.nth(1)).toHaveText('Sauce Labs Bike Light');
    await expect(productNames.nth(2)).toHaveText('Sauce Labs Bolt T-Shirt');
    await expect(productNames.nth(3)).toHaveText('Test.allTheThings() T-Shirt (Red)');
    await expect(productNames.nth(4)).toHaveText('Sauce Labs Backpack');
    await expect(productNames.nth(5)).toHaveText('Sauce Labs Fleece Jacket');

    // 3. Open the Sauce Labs Backpack product details.
    await page.locator('text=Sauce Labs Backpack').click();

    await expect(page).toHaveURL(/\/inventory-item\.html\?id=4$/);
    await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_details_desc')).toContainText('carry.allTheThings() with the sleek, streamlined Sly Pack');
    await expect(page.locator('.inventory_details_price')).toHaveText('$29.99');
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();

    // 4. Click Back to products.
    await page.getByRole('button', { name: 'Back to products' }).click();

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(sortSelect).toHaveValue('az');
    await expect(productNames.nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(productNames.nth(1)).toHaveText('Sauce Labs Bike Light');
    await expect(productNames.nth(2)).toHaveText('Sauce Labs Bolt T-Shirt');
    await expect(productNames.nth(3)).toHaveText('Sauce Labs Fleece Jacket');
    await expect(productNames.nth(4)).toHaveText('Sauce Labs Onesie');
    await expect(productNames.nth(5)).toHaveText('Test.allTheThings() T-Shirt (Red)');
  });
});
