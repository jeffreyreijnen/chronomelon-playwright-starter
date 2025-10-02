import { test, expect } from '@playwright/test';
import env from '../../config/env';

test('The Internet - Dynamic Controls enable/disable input', async ({ page }) => {
  await page.goto(`${env.BASE_URL_INTERNET}/dynamic_controls`);
  const input = page.locator('#input-example input');
  await expect(input).toBeDisabled();
  await page.getByRole('button', { name: 'Enable' }).click();
  await expect(input).toBeEnabled();
  await page.getByRole('button', { name: 'Disable' }).click();
  await expect(input).toBeDisabled();
});


