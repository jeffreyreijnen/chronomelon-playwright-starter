import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';
import { CartPage } from '../../pages/saucedemo/CartPage';
import { CheckoutPage } from '../../pages/saucedemo/CheckoutPage';
import { users } from '../../fixtures/users';
import { customer } from '../../fixtures/testData';
import env from '../../config/env';

test('Sauce Demo - Checkout E2E', async ({ page }) => {
  await page.goto(env.BASE_URL_SAUCE);
  await new LoginPage(page).loginAs(users.standard);
  await expect(page).toHaveURL(/inventory.html/);

  const inventory = new InventoryPage(page);
  await test.step('Add two items to cart', async () => {
    await inventory.addItemByName('Sauce Labs Backpack');
    await inventory.addItemByName('Sauce Labs Bike Light');
    await expect(inventory.cartBadge).toHaveText('2');
  });

  await test.step('Proceed to cart and checkout', async () => {
    await page.locator('.shopping_cart_link').click();
    await new CartPage(page).proceedToCheckout();
  });

  const checkout = new CheckoutPage(page);
  await test.step('Fill customer info and continue', async () => {
    await checkout.fillCustomerInfo(customer);
  });
  await test.step('Finish and assert confirmation', async () => {
    await checkout.finish();
    await checkout.assertConfirmation();
  });
});

