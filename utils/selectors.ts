import { Locator, Page } from '@playwright/test';

export function productTileByName(page: Page, name: string): Locator {
  return page.locator('.inventory_item').filter({ hasText: name });
}

export function buttonInTile(tile: Locator, name: string): Locator {
  return tile.getByRole('button', { name });
}


