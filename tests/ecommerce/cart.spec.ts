import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';
import { CartPage } from '../../pages/saucedemo/CartPage';
import { users } from '../../fixtures/users';
import env from '../../config/env';

test.describe('Sauce Demo - Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(env.BASE_URL_SAUCE);
    await new LoginPage(page).loginAs(users.standard);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('add multiple items, badge increments, remove updates', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await test.step('Add two items to cart', async () => {
      await inventory.addItemByName('Sauce Labs Backpack');
      await inventory.addItemByName('Sauce Labs Bike Light');
      await expect(inventory.cartBadge).toHaveText('2');
    });

    await test.step('Open cart and remove one item', async () => {
      await page.locator('.shopping_cart_link').click();
      const cart = new CartPage(page);
      await cart.assertItemPresent('Sauce Labs Backpack');
      await cart.assertItemPresent('Sauce Labs Bike Light');
      await cart.removeItem('Sauce Labs Bike Light');
      await expect(cart.items).toHaveCount(1);
    });
  });
});

