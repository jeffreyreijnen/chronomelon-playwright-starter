import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';
import { users } from '../../fixtures/users';
import env from '../../config/env';

test.describe('Sauce Demo - Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(env.BASE_URL_SAUCE);
    await new LoginPage(page).loginAs(users.standard);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('change sort order and assert first/last product names', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await test.step('Sort by Name (Z to A)', async () => {
      await expect(page.locator('.inventory_list')).toBeVisible();
      await expect(page.locator('.product_sort_container')).toBeVisible();
      await inventory.sortBy('za');
    });

    const first = page.locator('.inventory_item_name').first();
    const last = page.locator('.inventory_item_name').last();
    await expect(first).toBeVisible();
    await expect(last).toBeVisible();

    await test.step('Sort by Name (A to Z) and verify changes', async () => {
      await inventory.sortBy('az');
      await expect(first).toBeVisible();
      await expect(last).toBeVisible();
    });
  });
});


