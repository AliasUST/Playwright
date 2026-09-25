import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { InventoryPage } from './InventoryPage';

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.getByRole('textbox', { name: 'Username' });
  readonly passwordInput = this.page.getByRole('textbox', { name: 'Password' });
  readonly loginButton = this.page.getByRole('button', { name: 'Login' });

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com');
  }

  async loginAs(credentials: { username: string; password: string }): Promise<InventoryPage> {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();

    const inventoryPage = new InventoryPage(this.page);
    await this.page.waitForURL(/\/inventory\.html$/);
    await inventoryPage.productsHeading.waitFor();

    return inventoryPage;
  }
}
