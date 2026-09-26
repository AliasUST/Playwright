import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { InventoryPage } from './InventoryPage';

export class ProductDetailsPage extends BasePage {
  readonly productName = this.page.getByText('Sauce Labs Backpack', { exact: true });
  readonly productDescription = this.page.getByText(
    'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    { exact: true },
  );
  readonly productPrice = this.page.getByText('$29.99', { exact: true });
  readonly backToProductsButton = this.page.getByRole('button', { name: 'Back to products' });

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory-item.html?id=4');
  }

  async BACKTOPRODUCT(): Promise<InventoryPage> {
    await this.backToProductsButton.click();

    const inventoryPage = new InventoryPage(this.page);
    await this.page.waitForURL(/\/inventory\.html$/);
    await inventoryPage.productsHeading.waitFor();

    return inventoryPage;
  }
}
