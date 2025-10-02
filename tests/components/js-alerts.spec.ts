import { test, expect } from '@playwright/test';
import env from '../../config/env';

test('The Internet - JS Alerts accept/dismiss', async ({ page }) => {
  await page.goto(`${env.BASE_URL_INTERNET}/javascript_alerts`);

  page.once('dialog', async (dialog) => {
    await dialog.accept();
  });
  await page.getByRole('button', { name: 'Click for JS Alert' }).click();
  await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');

  page.once('dialog', async (dialog) => {
    await dialog.dismiss();
  });
  await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
  await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
});


