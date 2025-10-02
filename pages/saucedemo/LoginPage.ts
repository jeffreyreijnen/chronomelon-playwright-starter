import { expect, Locator, Page } from '@playwright/test';
import env from '../../config/env';
import type { UserCredentials } from '../../fixtures/users';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByPlaceholder('Username');
    this.password = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorBanner = page.locator('[data-test="error"]');
  }

  async goto(): Promise<void> {
    await this.page.goto(env.BASE_URL_SAUCE);
  }

  async loginAs(user: UserCredentials): Promise<void> {
    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.loginButton.click();
  }

  async assertError(message: string): Promise<void> {
    await expect(this.errorBanner).toHaveText(message);
  }
}

export default LoginPage;


