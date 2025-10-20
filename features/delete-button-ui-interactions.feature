Feature: Delete Button UI Interactions and Styling
  As a user interacting with the book search interface
  I want the delete button to provide clear visual feedback and intuitive interactions
  So that I can confidently use the delete functionality with a good user experience

  Background:
    Given I am on the book search application
    And the application interface is fully loaded

  @ui-styling @button-appearance
  Scenario: Delete button has correct default appearance
    Given the search input field has text content
    Then the delete button should have transparent background
    And the delete button text should be blue (#007bff)
    And the delete button should have blue border (2px solid #007bff)
    And the delete button should have rounded corners (6px border-radius)
    And the delete button should have padding of 12px 24px
    And the delete button font should be 16px with weight 600

  @ui-styling @hover-interactions
  Scenario: Delete button hover state provides proper visual feedback
    Given the delete button is enabled
    When I hover my mouse over the delete button
    Then the button background should change to blue (#007bff)
    And the button text color should change to white
    And the button should move up by 1px (translateY(-1px))
    And the transition should be smooth (0.3s ease)
    When I move my mouse away from the button
    Then the button should return to its original appearance
    And the transition should be smooth

  @ui-styling @disabled-appearance
  Scenario: Delete button disabled state has correct visual indicators
    Given the search input field is empty
    Then the delete button should be in disabled state
    And the button text color should be light gray (#ccc)
    And the button border color should be light gray (#ccc)
    And the button background should remain transparent
    And the cursor should display "not-allowed" when hovering

  @ui-interactions @click-feedback
  Scenario: Delete button provides appropriate click feedback
    Given I have entered "test search" in the search input field
    When I click and hold the delete button
    Then the button should show active state styling
    When I release the click
    Then the delete action should be performed
    And the button should return to disabled state immediately
    And the visual transition should be smooth

  @ui-interactions @focus-indicators
  Scenario: Delete button shows proper focus indicators for keyboard users
    Given I am navigating with keyboard only
    When I tab to the delete button
    Then the delete button should have a visible focus outline
    And the focus indicator should be clearly distinguishable
    And the focus indicator should meet accessibility contrast requirements
    When I tab away from the delete button
    Then the focus indicator should be removed

  @ui-layout @button-positioning
  Scenario: Delete button is properly positioned within the search container
    Given I view the search interface
    Then the delete button should be positioned to the right of the search button
    And there should be consistent 10px gap between search and delete buttons
    And the delete button should be vertically aligned with the search button
    And the button heights should match exactly

  @ui-layout @responsive-behavior
  Scenario: Delete button adapts correctly to mobile responsive layout
    Given I am viewing on a mobile device (max-width: 768px)
    Then the delete button should stack below the search button
    And the delete button should take full width of its container
    And the button should maintain proper touch target size (minimum 44px height)
    And the spacing between buttons should be appropriate for mobile

  @ui-accessibility @color-contrast
  Scenario: Delete button meets accessibility color contrast requirements
    Given I need to verify accessibility compliance
    Then the delete button text color (#007bff) against transparent background should meet WCAG contrast ratios
    And the disabled button text color (#ccc) should be clearly distinguishable as disabled
    And the hover state (white text on blue background) should have sufficient contrast
    And all color combinations should be accessible to color-blind users

  @ui-accessibility @size-requirements
  Scenario: Delete button meets minimum size requirements for accessibility
    Given I check the button sizing for accessibility
    Then the delete button should have minimum height of 44px for touch accessibility
    And the button should have adequate padding for easy clicking
    And the button should be large enough for users with motor disabilities
    And the click target area should include the border area

  @ui-animations @transition-smoothness
  Scenario: Delete button animations are smooth and not disorienting
    Given the delete button is enabled
    When I perform hover interactions
    Then all transitions should use "ease" timing function
    And transition duration should be 0.3s for color changes
    And transform transitions should be 0.1s for immediate feedback
    And no transition should cause jarring or abrupt visual changes
    And animations should respect user's motion preferences

  @ui-states @button-state-consistency
  Scenario: Delete button states are visually consistent with search button
    Given I compare the delete button with the search button
    Then both buttons should have the same height and padding
    And both buttons should have the same font size and weight
    And both buttons should have consistent border radius
    And both buttons should have similar transition timings
    And the disabled states should follow the same visual pattern

  @ui-feedback @loading-state-behavior
  Scenario: Delete button visual behavior during loading states
    Given a search is currently in progress
    And the loading state is active
    When I click the delete button
    Then the button should provide immediate visual feedback
    And the button should not appear to be "stuck" or unresponsive
    And the clearing action should be visually instant
    And the button should smoothly transition to disabled state

  @ui-errors @error-state-visual-handling
  Scenario: Delete button appearance is not affected by error states
    Given a search has resulted in an error
    And error messaging is displayed
    Then the delete button should maintain its normal appearance
    And the button should not show any error-related styling
    And clicking the delete button should work normally
    And the button should clear the error state visually

  @ui-customization @theme-compatibility
  Scenario: Delete button styling works with application theme
    Given the application uses the defined color scheme
    Then the delete button blue color (#007bff) should match the search button
    And the button should integrate seamlessly with the overall design
    And the hover states should be consistent with application patterns
    And the disabled states should follow application conventions

  @ui-usability @visual-hierarchy
  Scenario: Delete button has appropriate visual hierarchy in the interface
    Given I view the complete search interface
    Then the delete button should be visually secondary to the search button
    And the button should be easily discoverable when needed
    And the button should not compete with primary actions for attention
    And the button placement should follow intuitive interface patterns

  @ui-interactions @button-feedback-timing
  Scenario: Delete button provides feedback at appropriate timing
    Given I interact with the delete button
    When I click the button
    Then visual feedback should be immediate (< 100ms)
    And the clearing action should appear instantaneous
    And the button state change should be immediate
    And any animations should complete within 300ms
    And the user should never question if the action was registered