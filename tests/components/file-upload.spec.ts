import { test, expect } from '@playwright/test';
import env from '../../config/env';
import path from 'path';

test('The Internet - File Upload', async ({ page }) => {
  await page.goto(`${env.BASE_URL_INTERNET}/upload`);
  const filePath = path.join(process.cwd(), 'tests', 'resources', 'sample.txt');
  await page.setInputFiles('input[type="file"]', filePath);
  await page.getByRole('button', { name: 'Upload' }).click();
  await expect(page.locator('#uploaded-files')).toHaveText('sample.txt');
});


