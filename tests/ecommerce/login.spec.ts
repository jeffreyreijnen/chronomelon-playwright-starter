import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { users } from '../../fixtures/users';
import env from '../../config/env';

test.describe('Sauce Demo - Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(env.BASE_URL_SAUCE);
  });

  test('success with standard_user lands on inventory', async ({ page }) => {
    const login = new LoginPage(page);
    await test.step('Login with valid credentials', async () => {
      await login.loginAs(users.standard);
    });
    await test.step('Assert inventory page URL', async () => {
      await expect(page).toHaveURL(/inventory.html/);
      await expect(page.locator('.inventory_list')).toBeVisible();
    });
  });

  test('locked out user shows error banner', async ({ page }) => {
    const login = new LoginPage(page);
    await test.step('Attempt login with locked out user', async () => {
      await login.loginAs(users.lockedOut);
    });
    await test.step('Assert error banner text', async () => {
      await login.assertError('Epic sadface: Sorry, this user has been locked out.');
      await expect(page.locator('[data-test="error"]')).toBeVisible();
    });
  });
});

