import { Page, Locator, expect } from '@playwright/test';

export class BookSearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchTypeDropdown: Locator;
  readonly searchButton: Locator;
  readonly deleteButton: Locator;
  readonly loadingIndicator: Locator;
  readonly errorMessage: Locator;
  readonly bookResults: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[type="text"]').first();
    this.searchTypeDropdown = page.locator('select');
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.deleteButton = page.locator('.delete-button');
    this.loadingIndicator = page.locator('.loading');
    this.errorMessage = page.locator('.error');
    this.bookResults = page.locator('.book-item');
    this.noResultsMessage = page.locator('text=No results found');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async fillSearchInput(text: string) {
    await this.searchInput.fill(text);
  }

  async clearSearchInput() {
    await this.searchInput.clear();
  }

  async selectSearchType(type: 'general' | 'title' | 'author' | 'isbn') {
    await this.searchTypeDropdown.selectOption(type);
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }

  async clickDeleteButton() {
    await this.deleteButton.click();
  }

  async performSearch(query: string, type: 'general' | 'title' | 'author' | 'isbn' = 'general') {
    await this.fillSearchInput(query);
    await this.selectSearchType(type);
    await this.clickSearchButton();
  }

  async getSearchInputValue(): Promise<string> {
    return await this.searchInput.inputValue();
  }

  async getSelectedSearchType(): Promise<string> {
    return await this.searchTypeDropdown.inputValue();
  }

  async isDeleteButtonEnabled(): Promise<boolean> {
    return await this.deleteButton.isEnabled();
  }

  async isDeleteButtonDisabled(): Promise<boolean> {
    return await this.deleteButton.isDisabled();
  }

  async isSearchButtonEnabled(): Promise<boolean> {
    return await this.searchButton.isEnabled();
  }

  async isSearchButtonDisabled(): Promise<boolean> {
    return await this.searchButton.isDisabled();
  }

  async isLoadingIndicatorVisible(): Promise<boolean> {
    return await this.loadingIndicator.isVisible();
  }

  async getBookResultsCount(): Promise<number> {
    return await this.bookResults.count();
  }

  async isNoResultsMessageVisible(): Promise<boolean> {
    return await this.noResultsMessage.isVisible();
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  async waitForSearchResults() {
    await this.page.waitForSelector('.book-item', { timeout: 10000 });
  }

  async waitForLoadingToComplete() {
    await this.page.waitForSelector('.loading', { state: 'hidden', timeout: 10000 });
  }

  async getDeleteButtonAriaLabel(): Promise<string | null> {
    return await this.deleteButton.getAttribute('aria-label');
  }

  async getDeleteButtonComputedStyle(property: string): Promise<string | null> {
    return await this.deleteButton.evaluate((el, prop) => {
      return window.getComputedStyle(el).getPropertyValue(prop);
    }, property);
  }

  async hoverDeleteButton() {
    await this.deleteButton.hover();
  }

  async focusDeleteButton() {
    await this.deleteButton.focus();
  }

  async focusSearchInput() {
    await this.searchInput.focus();
  }

  async isSearchInputFocused(): Promise<boolean> {
    return await this.searchInput.evaluate(el => document.activeElement === el);
  }

  async pressKeyOnDeleteButton(key: string) {
    await this.deleteButton.focus();
    await this.page.keyboard.press(key);
  }

  async rapidClickDeleteButton(times: number) {
    for (let i = 0; i < times; i++) {
      await this.deleteButton.click();
    }
  }

  async typeInSearchInput(text: string) {
    await this.searchInput.type(text);
  }

  async expectDeleteButtonToBeEnabled() {
    await expect(this.deleteButton).toBeEnabled();
  }

  async expectDeleteButtonToBeDisabled() {
    await expect(this.deleteButton).toBeDisabled();
  }

  async expectSearchInputToBeEmpty() {
    await expect(this.searchInput).toHaveValue('');
  }

  async expectSearchInputToHaveValue(value: string) {
    await expect(this.searchInput).toHaveValue(value);
  }

  async expectSearchTypeToBeGeneral() {
    await expect(this.searchTypeDropdown).toHaveValue('general');
  }

  async expectSearchTypeToHaveValue(value: string) {
    await expect(this.searchTypeDropdown).toHaveValue(value);
  }

  async expectNoBookResults() {
    await expect(this.bookResults).toHaveCount(0);
  }

  async expectBookResultsToBeVisible() {
    await expect(this.bookResults).toHaveCount({ min: 1 });
  }

  async expectDeleteButtonToHaveAriaLabel(label: string) {
    await expect(this.deleteButton).toHaveAttribute('aria-label', label);
  }

  async expectSearchInputToHaveFocus() {
    await expect(this.searchInput).toBeFocused();
  }

  async expectApplicationToBeInInitialState() {
    await this.expectSearchInputToBeEmpty();
    await this.expectSearchTypeToBeGeneral();
    await this.expectDeleteButtonToBeDisabled();
    await this.expectNoBookResults();
    await expect(this.loadingIndicator).not.toBeVisible();
    await expect(this.errorMessage).not.toBeVisible();
    await expect(this.noResultsMessage).not.toBeVisible();
  }

  async setMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 });
  }

  async setDesktopViewport() {
    await this.page.setViewportSize({ width: 1280, height: 720 });
  }
}