import { expect, Locator, Page } from '@playwright/test';

export async function assertHasText(locator: Locator, text: string): Promise<void> {
  await expect(locator).toHaveText(text);
}

export async function expectUrlContains(page: Page, partial: string): Promise<void> {
  await expect(page).toHaveURL(new RegExp(partial));
}

export async function selectByValue(select: Locator, value: string): Promise<void> {
  await select.selectOption({ value });
}


