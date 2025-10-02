import { test, expect } from '@playwright/test';

test('The Internet - Basic Auth', async ({ page }) => {
  const username = 'admin';
  const password = 'admin';
  await page.goto(`https://${username}:${password}@the-internet.herokuapp.com/basic_auth`);
  await expect(page.locator('p')).toContainText('Congratulations!');
});

