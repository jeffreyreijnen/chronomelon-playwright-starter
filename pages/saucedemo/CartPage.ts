import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async assertItemPresent(name: string): Promise<void> {
    await expect(this.page.locator('.inventory_item_name', { hasText: name })).toBeVisible();
  }

  async removeItem(name: string): Promise<void> {
    const row = this.page.locator('.cart_item').filter({ hasText: name });
    await row.getByRole('button', { name: 'Remove' }).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}

export default CartPage;


