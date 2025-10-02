import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import env from '../../config/env';

test('Sauce Demo - Network stub inventory (modify main JS before first load)', async ({ page }) => {
  await test.step('Route JS bundle before first navigation', async () => {
    await page.route('**/static/js/*.js', async (route) => {
      const upstream = await route.fetch();
      const body = await upstream.text();
      if (body.includes('Sauce Labs Backpack')) {
        const modified = body.replaceAll('Sauce Labs Backpack', 'Chronomelon Backpack');
        return route.fulfill({
          status: upstream.status(),
          headers: upstream.headers(),
          body: modified,
          contentType: 'application/javascript',
        });
      }
      return route.continue();
    });
  });

  await page.goto(env.BASE_URL_SAUCE);
  await new LoginPage(page).loginAs({ username: 'standard_user', password: 'secret_sauce' });
  await expect(page).toHaveURL(/inventory.html/);

  await test.step('Assert mocked first product name is shown', async () => {
    const first = page.locator('.inventory_item_name').first();
    await expect(first).toHaveText(/Chronomelon Backpack/);
  });
});

