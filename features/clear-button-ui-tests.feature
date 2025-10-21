Feature: Clear Button UI Functionality
  As a user of the book search application
  I want to interact with the clear button effectively
  So that I can reset my search and start fresh with a clean interface

  Background:
    Given I am on the book search application
    And the search form is visible

  @smoke @clear-button
  Scenario: Clear button initial state when search input is empty
    Given the search input field is empty
    When I look at the clear button
    Then the clear button should be disabled
    And the clear button should have the text "Clear"
    And the clear button should have aria-label "Clear search"
    And the clear button should have CSS class "clear-button"

  @positive @clear-button
  Scenario: Clear button becomes enabled when text is entered
    Given the search input field is empty
    And the clear button is disabled
    When I type "angular" into the search input field
    Then the clear button should be enabled
    And the clear button should be clickable
    And the clear button should display with active styling

  @positive @clear-button
  Scenario: Clear button functionality with text in search input
    Given I have typed "javascript books" into the search input field
    And the search type is set to "Author"
    When I click the clear button
    Then the search input field should be empty
    And the search type should be reset to "General Search"
    And the search input field should be focused
    And the clear button should be disabled

  @positive @clear-button
  Scenario: Clear button functionality after performing a search
    Given I have typed "python programming" into the search input field
    And I have performed a search
    And search results are displayed
    When I click the clear button
    Then the search input field should be empty
    And the search type should be reset to "General Search"
    And the search results should be cleared from the display
    And the search input field should be focused
    And the clear button should be disabled

  @visual @clear-button
  Scenario: Clear button visual states and styling
    Given the search input field is empty
    When I look at the clear button
    Then the clear button should have disabled styling
    And the clear button text color should be "#ccc"
    And the clear button border color should be "#ccc"
    When I type "test" into the search input field
    Then the clear button should have enabled styling
    And the clear button text color should be "#007bff"
    And the clear button border color should be "#007bff"

  @interaction @clear-button
  Scenario: Clear button hover effects when enabled
    Given I have typed "react hooks" into the search input field
    And the clear button is enabled
    When I hover over the clear button
    Then the clear button background should change to "#007bff"
    And the clear button text color should change to "white"
    And the clear button should show a slight upward transform effect

  @interaction @clear-button
  Scenario: Clear button hover effects when disabled
    Given the search input field is empty
    And the clear button is disabled
    When I hover over the clear button
    Then the clear button should not show any hover effects
    And the clear button should maintain disabled styling
    And the cursor should show "not-allowed" when hovering

  @keyboard @clear-button
  Scenario: Clear button keyboard accessibility
    Given I have typed "vue.js" into the search input field
    When I navigate to the clear button using Tab key
    Then the clear button should receive keyboard focus
    And the clear button should show focus indicators
    When I press Enter key on the clear button
    Then the clear functionality should be triggered
    And the search input field should be empty and focused

  @edge-case @clear-button
  Scenario: Clear button with whitespace-only input
    Given I have typed "   " (only spaces) into the search input field
    When I look at the clear button
    Then the clear button should be disabled
    And the clear button should have disabled styling

  @edge-case @clear-button
  Scenario: Clear button with single character input
    Given the search input field is empty
    When I type "a" into the search input field
    Then the clear button should be enabled
    When I click the clear button
    Then the search input field should be empty
    And the clear button should be disabled

  @integration @clear-button
  Scenario: Clear button interaction with search type dropdown
    Given I have selected "Title" from the search type dropdown
    And I have typed "design patterns" into the search input field
    When I click the clear button
    Then the search type should be reset to "General Search"
    And the search input field should be empty
    And the search input field should be focused

  @integration @clear-button
  Scenario: Clear button interaction with search button
    Given I have typed "machine learning" into the search input field
    And both search and clear buttons are enabled
    When I click the clear button
    Then the search button should become disabled
    And the clear button should become disabled
    And the search input field should be empty

  @accessibility @clear-button
  Scenario: Clear button accessibility attributes
    Given the clear button is visible
    When I inspect the clear button
    Then the clear button should have type attribute "button"
    And the clear button should have aria-label "Clear search"
    And the clear button should be properly associated with the search input

  @responsiveness @clear-button
  Scenario: Clear button on mobile devices
    Given I am viewing the application on a mobile device
    And I have typed "mobile development" into the search input field
    When I look at the clear button
    Then the clear button should be visible and properly sized for touch interaction
    When I tap the clear button
    Then the clear functionality should work correctly
    And the search input field should be focused

  @performance @clear-button
  Scenario: Clear button rapid clicking
    Given I have typed "performance testing" into the search input field
    When I click the clear button multiple times rapidly
    Then the clear functionality should work correctly
    And no errors should occur
    And the UI should remain stable

  @state-management @clear-button
  Scenario: Clear button state consistency
    Given I have typed "state management" into the search input field
    And I have performed a search
    When I navigate away from the page and return
    And the search state is restored
    And I click the clear button
    Then all components should be properly reset
    And the application state should be consistent

  @validation @clear-button
  Scenario: Clear button with special characters in input
    Given I have typed "!@#$%^&*()" into the search input field
    When I click the clear button
    Then the search input field should be completely empty
    And no special characters should remain
    And the clear button should be disabled

  @boundary @clear-button
  Scenario: Clear button with maximum length input
    Given I have typed a very long search query (over 1000 characters)
    When I click the clear button
    Then the entire search input should be cleared
    And the clear operation should complete quickly
    And the clear button should be disabled

  @error-handling @clear-button
  Scenario: Clear button during search loading state
    Given I have initiated a search and it is currently loading
    When I click the clear button
    Then the search should be cancelled
    And the loading state should be cleared
    And the search input field should be empty and focused
    And no search results should be displayed