import { test, expect } from '../../src/fixtures/base';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { LoginPage } from '../../src/pages/LoginPage';
import users from '../data/users.json';

test.describe('Standard user login', () => {
  let inventory: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    page.pause();
    await login.goto();
    await expect(login.usernameInput).toBeVisible().todo;
    await expect(login.passwordInput).toBeVisible();
    await expect(login.loginButton).toBeVisible();

    inventory = await login.loginAs(users.standard);
  });

  test('successful login lands on the inventory page @smoke @critical', async ({ page }) => {
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventory.productsHeading).toBeVisible();
    await expect(inventory.productButtons).toHaveCount(6);
  });
});
