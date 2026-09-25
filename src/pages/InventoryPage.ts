import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly productsHeading = this.page.getByText('Products', { exact: true });
  readonly productButtons = this.page.getByRole('button', { name: 'Add to cart' });
  readonly cartLink = this.page.getByRole('button', { name: /cart/i });

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }
}
