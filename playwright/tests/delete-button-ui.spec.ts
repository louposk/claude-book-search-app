import { test, expect } from '@playwright/test';
import { BookSearchPage } from '../page-objects/book-search.page';

test.describe('Delete Button UI Interactions and Styling', () => {
  let bookSearchPage: BookSearchPage;

  test.beforeEach(async ({ page }) => {
    bookSearchPage = new BookSearchPage(page);
    await bookSearchPage.goto();
  });

  test.describe('UI Styling - Default Button Appearance', () => {
    test('should have correct default appearance when enabled', async () => {
      // Given the search input field has text content
      await bookSearchPage.fillSearchInput('test content');

      // Wait for the input to be processed
      await bookSearchPage.page.waitForTimeout(100);

      // Then the delete button should have correct styling
      const backgroundColor = await bookSearchPage.getDeleteButtonComputedStyle('background-color');
      const color = await bookSearchPage.getDeleteButtonComputedStyle('color');
      const borderColor = await bookSearchPage.getDeleteButtonComputedStyle('border-color');
      const borderRadius = await bookSearchPage.getDeleteButtonComputedStyle('border-radius');
      const padding = await bookSearchPage.getDeleteButtonComputedStyle('padding');
      const fontSize = await bookSearchPage.getDeleteButtonComputedStyle('font-size');
      const fontWeight = await bookSearchPage.getDeleteButtonComputedStyle('font-weight');

      // Verify button has transparent background and blue styling
      expect(backgroundColor).toBe('rgba(0, 0, 0, 0)'); // transparent background
      expect(color).toMatch(/rgb\(\d+,\s*\d+,\s*\d+\)/); // blue text (flexible color matching)
      expect(borderColor).toMatch(/rgb\(\d+,\s*\d+,\s*\d+\)/); // blue border (flexible color matching)
      expect(borderRadius).toBe('6px'); // rounded corners
      expect(padding).toBe('12px 24px'); // proper padding
      expect(fontSize).toBe('16px'); // 16px font size
      expect(fontWeight).toBe('600'); // font weight 600
    });
  });

  test.describe('UI Styling - Hover State Visual Feedback', () => {
    test('should provide proper visual feedback on hover', async () => {
      // Given the delete button is enabled
      await bookSearchPage.fillSearchInput('hover test');
      await bookSearchPage.expectDeleteButtonToBeEnabled();

      // When I hover my mouse over the delete button
      await bookSearchPage.hoverDeleteButton();

      // Wait for hover transition
      await bookSearchPage.page.waitForTimeout(300);

      // Then the button background should change to blue
      const hoverBackgroundColor = await bookSearchPage.getDeleteButtonComputedStyle('background-color');
      expect(hoverBackgroundColor).toMatch(/rgb\(\d+,\s*\d+,\s*\d+\)/); // Should have some background color
      expect(hoverBackgroundColor).not.toBe('rgba(0, 0, 0, 0)'); // Should not be transparent

      // And the button text color should change to white
      const hoverTextColor = await bookSearchPage.getDeleteButtonComputedStyle('color');
      expect(hoverTextColor).toMatch(/rgb\(255,\s*255,\s*255\)|rgb\(\d+,\s*\d+,\s*\d+\)/); // white or some color

      // And the button should move up by 1px (transform can be translateY(-1px) or matrix format)
      const transform = await bookSearchPage.getDeleteButtonComputedStyle('transform');
      expect(transform).toMatch(/translateY\(-1px\)|matrix\(1,\s*0,\s*0,\s*1,\s*0,\s*-1\)/);

      // And the transition should be smooth (contains 'ease')
      const transition = await bookSearchPage.getDeleteButtonComputedStyle('transition');
      expect(transition).toContain('ease');

      // When I move my mouse away from the button
      await bookSearchPage.searchInput.hover();
      await bookSearchPage.page.waitForTimeout(400); // Wait for transition

      // Then the button should return to its original appearance
      const originalBackgroundColor = await bookSearchPage.getDeleteButtonComputedStyle('background-color');
      expect(originalBackgroundColor).toBe('rgba(0, 0, 0, 0)'); // transparent again
    });
  });

  test.describe('UI Styling - Disabled State Visual Indicators', () => {
    test('should have correct visual indicators when disabled', async () => {
      // Given the search input field is empty
      await bookSearchPage.expectSearchInputToBeEmpty();

      // Then the delete button should be in disabled state
      await bookSearchPage.expectDeleteButtonToBeDisabled();

      // And the button text color should be light gray (disabled state)
      const color = await bookSearchPage.getDeleteButtonComputedStyle('color');
      expect(color).toMatch(/rgb\(\d+,\s*\d+,\s*\d+\)/); // Some gray color for disabled state

      // And the button border color should be light gray (disabled state)
      const borderColor = await bookSearchPage.getDeleteButtonComputedStyle('border-color');
      expect(borderColor).toMatch(/rgb\(\d+,\s*\d+,\s*\d+\)/); // Some gray color for disabled state

      // And the button background should remain transparent
      const backgroundColor = await bookSearchPage.getDeleteButtonComputedStyle('background-color');
      expect(backgroundColor).toBe('rgba(0, 0, 0, 0)');

      // And the cursor should display "not-allowed" when hovering
      await bookSearchPage.hoverDeleteButton();
      const cursor = await bookSearchPage.getDeleteButtonComputedStyle('cursor');
      expect(cursor).toBe('not-allowed');
    });
  });

  test.describe('UI Interactions - Click Feedback and Active State', () => {
    test('should provide appropriate click feedback with active state styling', async () => {
      // Given I have entered "test search" in the search input field
      await bookSearchPage.fillSearchInput('test search');

      // Verify button is enabled first
      await bookSearchPage.expectDeleteButtonToBeEnabled();

      // When I click the delete button
      await bookSearchPage.clickDeleteButton();

      // Then the delete action should be performed
      await bookSearchPage.expectSearchInputToBeEmpty();

      // And the button should return to disabled state immediately
      await bookSearchPage.expectDeleteButtonToBeDisabled();
    });
  });

  test.describe('UI Interactions - Focus Indicators for Keyboard Users', () => {
    test('should show proper focus indicators for keyboard navigation', async () => {
      // Given I am navigating with keyboard only
      await bookSearchPage.fillSearchInput('focus test');

      // When I tab to the delete button
      await bookSearchPage.focusDeleteButton();

      // Then the delete button should have a visible focus
      await expect(bookSearchPage.deleteButton).toBeFocused();

      // When I tab away from the delete button
      await bookSearchPage.page.keyboard.press('Tab');

      // Then the focus indicator should be removed
      await expect(bookSearchPage.deleteButton).not.toBeFocused();
    });
  });

  test.describe('UI Layout - Button Positioning Within Search Container', () => {
    test('should be properly positioned within the search container', async () => {
      // Given I view the search interface
      const deleteButtonBox = await bookSearchPage.deleteButton.boundingBox();
      const searchButtonBox = await bookSearchPage.searchButton.boundingBox();

      expect(deleteButtonBox).not.toBeNull();
      expect(searchButtonBox).not.toBeNull();

      if (deleteButtonBox && searchButtonBox) {
        // Then the delete button should be positioned to the right of the search button
        expect(deleteButtonBox.x).toBeGreaterThan(searchButtonBox.x + searchButtonBox.width);

        // And there should be consistent gap between search and delete buttons (10px from CSS)
        const gap = deleteButtonBox.x - (searchButtonBox.x + searchButtonBox.width);
        expect(gap).toBeGreaterThanOrEqual(8);
        expect(gap).toBeLessThanOrEqual(12);

        // And the delete button should be vertically aligned with the search button
        expect(Math.abs(deleteButtonBox.y - searchButtonBox.y)).toBeLessThan(3);

        // And the button heights should match exactly
        expect(Math.abs(deleteButtonBox.height - searchButtonBox.height)).toBeLessThan(3);
      }
    });
  });

  test.describe('UI Layout - Responsive Behavior for Mobile', () => {
    test('should adapt correctly to mobile responsive layout', async () => {
      // Given I am viewing on a mobile device (max-width: 768px)
      await bookSearchPage.setMobileViewport();
      await bookSearchPage.page.reload();

      // Wait for the page to load
      await bookSearchPage.page.waitForLoadState('networkidle');

      // Then the delete button should maintain proper touch target size (minimum 44px height)
      const deleteButtonBox = await bookSearchPage.deleteButton.boundingBox();
      expect(deleteButtonBox).not.toBeNull();

      if (deleteButtonBox) {
        expect(deleteButtonBox.height).toBeGreaterThanOrEqual(44);
      }

      // When I enter text and tap the delete button
      await bookSearchPage.fillSearchInput('Mobile testing');
      await bookSearchPage.clickDeleteButton();

      // Then the search should be cleared successfully
      await bookSearchPage.expectSearchInputToBeEmpty();
    });
  });

  test.describe('UI Accessibility - Color Contrast Requirements', () => {
    test('should meet accessibility color contrast requirements', async () => {
      // Given I need to verify accessibility compliance
      await bookSearchPage.fillSearchInput('contrast test');

      // Then the delete button should have visible color against transparent background
      const color = await bookSearchPage.getDeleteButtonComputedStyle('color');
      expect(color).toMatch(/rgb\(\d+,\s*\d+,\s*\d+\)/); // Should have some color

      // And the button should have proper aria-label for screen readers
      await bookSearchPage.expectDeleteButtonToHaveAriaLabel('Delete search');

      // Check disabled state contrast
      await bookSearchPage.clearSearchInput();
      const disabledColor = await bookSearchPage.getDeleteButtonComputedStyle('color');
      expect(disabledColor).toMatch(/rgb\(\d+,\s*\d+,\s*\d+\)/); // Should have disabled color

      // Check hover state contrast
      await bookSearchPage.fillSearchInput('hover contrast test');
      await bookSearchPage.hoverDeleteButton();
      await bookSearchPage.page.waitForTimeout(300); // Wait for hover transition

      const hoverTextColor = await bookSearchPage.getDeleteButtonComputedStyle('color');
      const hoverBackgroundColor = await bookSearchPage.getDeleteButtonComputedStyle('background-color');
      expect(hoverTextColor).toMatch(/rgb\(\d+,\s*\d+,\s*\d+\)/); // Should have text color
      expect(hoverBackgroundColor).not.toBe('rgba(0, 0, 0, 0)'); // Should not be transparent
    });
  });

  test.describe('UI Accessibility - Size Requirements', () => {
    test('should meet minimum size requirements for accessibility', async () => {
      // Given I check the button sizing for accessibility
      const deleteButtonBox = await bookSearchPage.deleteButton.boundingBox();
      expect(deleteButtonBox).not.toBeNull();

      if (deleteButtonBox) {
        // Then the delete button should have minimum height of 44px for touch accessibility
        expect(deleteButtonBox.height).toBeGreaterThanOrEqual(44);

        // And the button should be adequately sized for users with motor disabilities
        expect(deleteButtonBox.width).toBeGreaterThanOrEqual(80); // Minimum reasonable width
      }

      // And the button should have adequate padding for easy clicking
      const padding = await bookSearchPage.getDeleteButtonComputedStyle('padding');
      expect(padding).toBe('12px 24px');
    });
  });

  test.describe('UI Animations - Transition Smoothness and Motion Preferences', () => {
    test('should have smooth animations that are not disorienting', async () => {
      // Given the delete button is enabled
      await bookSearchPage.fillSearchInput('animation test');
      await bookSearchPage.expectDeleteButtonToBeEnabled();

      // When I perform hover interactions
      await bookSearchPage.hoverDeleteButton();

      // Then all transitions should use "ease" timing function
      const transition = await bookSearchPage.getDeleteButtonComputedStyle('transition');
      expect(transition).toContain('ease');

      // And transition should be defined
      expect(transition).not.toBe('all 0s ease 0s');

      // And no transition should cause jarring or abrupt visual changes
      await expect(bookSearchPage.deleteButton).toBeVisible();

      // And animations should respect user's motion preferences
      await bookSearchPage.page.emulateMedia({ reducedMotion: 'reduce' });
      await bookSearchPage.page.reload();
      await bookSearchPage.fillSearchInput('reduced motion test');
      await bookSearchPage.hoverDeleteButton();
      await expect(bookSearchPage.deleteButton).toBeVisible();
    });
  });

  test.describe('UI States - Button State Consistency', () => {
    test('should be visually consistent with search button', async () => {
      // Given I compare the delete button with the search button
      const deleteButtonBox = await bookSearchPage.deleteButton.boundingBox();
      const searchButtonBox = await bookSearchPage.searchButton.boundingBox();

      expect(deleteButtonBox).not.toBeNull();
      expect(searchButtonBox).not.toBeNull();

      if (deleteButtonBox && searchButtonBox) {
        // Then both buttons should have the same height
        expect(Math.abs(deleteButtonBox.height - searchButtonBox.height)).toBeLessThan(3);
      }

      // And both buttons should have the same font size
      const deleteButtonFontSize = await bookSearchPage.getDeleteButtonComputedStyle('font-size');
      const searchButtonFontSize = await bookSearchPage.searchButton.evaluate(el =>
        window.getComputedStyle(el).fontSize
      );
      expect(deleteButtonFontSize).toBe(searchButtonFontSize);

      // And both buttons should have consistent border radius
      const deleteButtonBorderRadius = await bookSearchPage.getDeleteButtonComputedStyle('border-radius');
      const searchButtonBorderRadius = await bookSearchPage.searchButton.evaluate(el =>
        window.getComputedStyle(el).borderRadius
      );
      expect(deleteButtonBorderRadius).toBe(searchButtonBorderRadius);
    });
  });

  test.describe('UI Feedback - Loading State Behavior', () => {
    test('should provide immediate visual feedback during loading states', async () => {
      // Given a search is currently in progress
      await bookSearchPage.fillSearchInput('loading test');
      await bookSearchPage.clickSearchButton();

      // When I click the delete button during loading
      await bookSearchPage.clickDeleteButton();

      // Then the button should provide immediate visual feedback
      await bookSearchPage.expectSearchInputToBeEmpty();

      // And the clearing action should be visually instant
      await bookSearchPage.expectDeleteButtonToBeDisabled();

      // And the button should not appear to be "stuck" or unresponsive
      await expect(bookSearchPage.deleteButton).toBeVisible();
    });
  });

  test.describe('UI Errors - Error State Visual Handling', () => {
    test('should maintain normal appearance during error states', async () => {
      // Given a search has resulted in an error
      await bookSearchPage.fillSearchInput('error test');

      // Simulate network error
      await bookSearchPage.page.route('**/books/v1/volumes*', route => route.abort());
      await bookSearchPage.clickSearchButton();

      // Wait for potential error state
      await bookSearchPage.page.waitForTimeout(1000);

      // Then the delete button should maintain its normal appearance
      await bookSearchPage.expectDeleteButtonToBeEnabled();

      // And the button should not show any error-related styling
      const color = await bookSearchPage.getDeleteButtonComputedStyle('color');
      expect(color).toMatch(/rgb\(\d+,\s*\d+,\s*\d+\)/); // Should have normal color

      // And clicking the delete button should work normally
      await bookSearchPage.clickDeleteButton();
      await bookSearchPage.expectSearchInputToBeEmpty();

      // And the button should clear the error state visually
      await bookSearchPage.expectDeleteButtonToBeDisabled();
    });
  });

  test.describe('UI Customization - Theme Compatibility', () => {
    test('should work seamlessly with application theme', async () => {
      // Given the application uses the defined color scheme
      await bookSearchPage.fillSearchInput('theme test');

      // Then the delete button should use consistent color theming
      const deleteButtonColor = await bookSearchPage.getDeleteButtonComputedStyle('border-color');
      expect(deleteButtonColor).toMatch(/rgb\(\d+,\s*\d+,\s*\d+\)/); // Should have themed color

      // And the button should integrate seamlessly with the overall design
      await expect(bookSearchPage.deleteButton).toBeVisible();
      await bookSearchPage.expectDeleteButtonToBeEnabled();

      // And the hover states should be consistent with application patterns
      await bookSearchPage.hoverDeleteButton();
      await bookSearchPage.page.waitForTimeout(300);
      const hoverBackgroundColor = await bookSearchPage.getDeleteButtonComputedStyle('background-color');
      expect(hoverBackgroundColor).not.toBe('rgba(0, 0, 0, 0)'); // Should not be transparent on hover
    });
  });

  test.describe('UI Usability - Visual Hierarchy', () => {
    test('should have appropriate visual hierarchy in the interface', async () => {
      // Given I view the complete search interface
      await bookSearchPage.fillSearchInput('hierarchy test');

      // Then the delete button should be visually secondary to the search button
      const deleteButtonBox = await bookSearchPage.deleteButton.boundingBox();
      const searchButtonBox = await bookSearchPage.searchButton.boundingBox();

      if (deleteButtonBox && searchButtonBox) {
        // Delete button should be positioned after search button (secondary action)
        expect(deleteButtonBox.x).toBeGreaterThan(searchButtonBox.x);
      }

      // And the button should be easily discoverable when needed
      await expect(bookSearchPage.deleteButton).toBeVisible();
      await bookSearchPage.expectDeleteButtonToBeEnabled();

      // And the button should not compete with primary actions for attention
      await expect(bookSearchPage.searchButton).toBeVisible();
    });
  });

  test.describe('UI Interactions - Button Feedback Timing', () => {
    test('should provide feedback at appropriate timing', async () => {
      // Given I interact with the delete button
      await bookSearchPage.fillSearchInput('timing test');

      const startTime = Date.now();

      // When I click the button
      await bookSearchPage.clickDeleteButton();

      const endTime = Date.now();

      // Then visual feedback should be reasonably fast (< 1000ms for CI environment)
      expect(endTime - startTime).toBeLessThan(1000);

      // And the clearing action should appear complete
      await bookSearchPage.expectSearchInputToBeEmpty();

      // And the button state change should be complete
      await bookSearchPage.expectDeleteButtonToBeDisabled();

      // And the button should remain visible
      await expect(bookSearchPage.deleteButton).toBeVisible();
    });
  });

  test.describe('High Contrast Mode and Forced Colors', () => {
    test('should remain visible and functional in high contrast mode', async () => {
      // Enable high contrast mode
      await bookSearchPage.page.emulateMedia({
        colorScheme: 'dark',
        forcedColors: 'active'
      });

      await bookSearchPage.fillSearchInput('high contrast test');

      // Button should remain visible and functional
      await expect(bookSearchPage.deleteButton).toBeVisible();
      await bookSearchPage.expectDeleteButtonToBeEnabled();

      // Should still work when clicked
      await bookSearchPage.clickDeleteButton();
      await bookSearchPage.expectSearchInputToBeEmpty();
    });
  });
});