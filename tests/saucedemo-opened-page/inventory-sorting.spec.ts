import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import { ProductDetailsPage } from '../../src/pages/ProductDetailsPage';
import { InventoryPage } from '../../src/pages/InventoryPage';
import users from '../data/users.json';

test.describe('Inventory sorting and product details', () => {
  test('sorts products and preserves the selection after viewing details @regression', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    let productDetails: ProductDetailsPage;

    await test.step('Log in and sort products by price', async () => {
      await login.goto();
      await login.loginAs(users.standard);
      await inventory.sortBy('lohi');

      await expect(inventory.sortDropdown).toHaveValue('lohi');
      await expect(inventory.firstProductName).toHaveText('Sauce Labs Onesie');
    });

    await test.step('Open the Sauce Labs Backpack details', async () => {
      productDetails = await inventory.openProduct('Sauce Labs Backpack');

      await expect(page).toHaveURL(/\/inventory-item\.html\?id=4$/);
      await expect(productDetails.productName).toBeVisible();
      await expect(productDetails.productDescription).toBeVisible();
      await expect(productDetails.productPrice).toBeVisible();
    });

    await test.step('Return to products with the sort selection preserved', async () => {
      const products = await productDetails.backToProducts();

      await expect(products.productsHeading).toBeVisible();
      await expect(products.sortDropdown).toHaveValue('lohi');
      await expect(products.firstProductName).toHaveText('Sauce Labs Onesie');
    });
  });
});