import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProductDetailsPage } from './ProductDetailsPage';

export class InventoryPage extends BasePage {
  readonly productsHeading = this.page.getByText('Products', { exact: true });
  readonly productButtons = this.page.getByRole('button', { name: 'Add to cart' });
  cartLink = this.page.getByRole('button', { name: /cart/i });
  readonly productNames = this.page.getByText(/^Sauce Labs /);
  readonly firstProductName = this.productNames.first();

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async sortBy(value: string): Promise<void> {
    await this.sortDropdown.selectOption(value);
  }

  async openProduct(productName: string): Promise<ProductDetailsPage> {
    await this.page.getByText(productName, { exact: true }).click();

    const productDetailsPage = new ProductDetailsPage(this.page);
    await this.page.waitForURL(/\/inventory-item\.html\?id=\d+$/);
    await productDetailsPage.productName.waitFor();

    return productDetailsPage;
  }
}
