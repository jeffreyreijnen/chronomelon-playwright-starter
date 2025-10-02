import { Locator, Page } from '@playwright/test';
import { productTileByName, buttonInTile } from '../../utils/selectors';

export class InventoryPage {
  readonly page: Page;
  readonly items: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('.product_sort_container');
  }

  itemTile(name: string): Locator {
    return productTileByName(this.page, name);
  }

  async addItemByName(name: string): Promise<void> {
    const tile = this.itemTile(name);
    await buttonInTile(tile, 'Add to cart').click();
  }

  async removeItemByName(name: string): Promise<void> {
    const tile = this.itemTile(name);
    await buttonInTile(tile, 'Remove').click();
  }

  async getCartCount(): Promise<number> {
    const visible = await this.cartBadge.isVisible();
    if (!visible) return 0;
    const text = await this.cartBadge.textContent();
    return Number(text ?? 0);
  }

  async sortBy(optionValue: string): Promise<void> {
    await this.page.locator('.inventory_list').first().waitFor({ state: 'visible' });
    await this.sortDropdown.waitFor({ state: 'visible' });
    await this.sortDropdown.selectOption(optionValue);
  }
}

export default InventoryPage;


