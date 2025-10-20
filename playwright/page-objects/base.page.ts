import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string = '/') {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `test-results/screenshots/${name}.png` });
  }

  async waitForTimeout(ms: number) {
    await this.page.waitForTimeout(ms);
  }

  async setViewportSize(width: number, height: number) {
    await this.page.setViewportSize({ width, height });
  }

  async setMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 });
  }

  async setDesktopViewport() {
    await this.page.setViewportSize({ width: 1280, height: 720 });
  }

  async enableHighContrastMode() {
    await this.page.emulateMedia({ colorScheme: 'dark', forcedColors: 'active' });
  }

  async enableReducedMotion() {
    await this.page.emulateMedia({ reducedMotion: 'reduce' });
  }

  async simulateNetworkOffline() {
    await this.page.context().setOffline(true);
  }

  async simulateNetworkOnline() {
    await this.page.context().setOffline(false);
  }

  async simulateSlowNetwork() {
    await this.page.route('**/*', async route => {
      await this.page.waitForTimeout(1000); // Simulate 1 second delay
      await route.continue();
    });
  }

  async clearLocalStorage() {
    await this.page.evaluate(() => {
      localStorage.clear();
    });
  }

  async clearSessionStorage() {
    await this.page.evaluate(() => {
      sessionStorage.clear();
    });
  }

  async injectJavaScriptError() {
    await this.page.evaluate(() => {
      // Inject a non-critical error
      console.error('Test injected error');
    });
  }

  async getConsoleErrors(): Promise<string[]> {
    const errors: string[] = [];
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    return errors;
  }
}