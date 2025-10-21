Feature: Clear Button Integration with Other Components
  As a user of the book search application
  I want the clear button to work seamlessly with all other UI components
  So that I have a cohesive and predictable user experience

  Background:
    Given I am on the book search application
    And all components are loaded and ready

  @integration @search-input
  Scenario: Clear button integration with search input field
    Given I have typed "integration test" into the search input field
    And the search input field has focus
    When I click the clear button
    Then the search input field should be empty
    And the search input field should maintain focus
    And the search input field placeholder should be visible
    And the search input field should accept new input immediately

  @integration @search-type-dropdown
  Scenario: Clear button integration with search type dropdown
    Given I have selected "Author" from the search type dropdown
    And I have typed "J.K. Rowling" into the search input field
    When I click the clear button
    Then the search type dropdown should reset to "General Search"
    And the search input field should be empty
    And the search type dropdown should be interactive
    And I should be able to select a different search type

  @integration @search-button
  Scenario: Clear button and search button state synchronization
    Given I have typed "synchronization test" into the search input field
    And both search and clear buttons are enabled
    When I click the clear button
    Then the search button should become disabled
    And the clear button should become disabled
    When I type "new search" into the search input field
    Then both search and clear buttons should become enabled again

  @integration @search-results
  Scenario: Clear button clearing search results display
    Given I have performed a search for "javascript"
    And search results are displayed in the results area
    When I click the clear button
    Then the search results should be completely cleared
    And the results area should show no books
    And the "no results" or empty state should not be displayed
    And the search input should be ready for new input

  @integration @loading-state
  Scenario: Clear button interaction during loading state
    Given I have initiated a search for "angular"
    And the search is currently loading
    And a loading indicator is displayed
    When I click the clear button
    Then the loading state should be immediately cancelled
    And the loading indicator should disappear
    And the search input should be cleared and focused
    And no partial results should be displayed

  @integration @error-state
  Scenario: Clear button clearing error states
    Given a search has resulted in an error
    And an error message is displayed
    When I type "recovery test" into the search input field
    And I click the clear button
    Then the error message should be cleared
    And the search input should be empty
    And the application should be ready for a new search
    And no error state should remain visible

  @integration @keyboard-navigation
  Scenario: Clear button in keyboard navigation flow
    Given I am navigating using only keyboard
    When I tab through the search form elements
    Then the navigation order should be: search type dropdown → search input → search button → clear button
    When I reach the clear button and it is disabled
    Then I should be able to continue tabbing to the next focusable element
    When the clear button is enabled and focused
    And I press Enter
    Then the clear action should execute and focus should move to search input

  @integration @form-validation
  Scenario: Clear button with form validation states
    Given the search input has validation styling (if any)
    And I have typed "validation test" into the search input field
    When I click the clear button
    Then any validation states should be reset
    And the search input should return to neutral styling
    And no validation messages should be displayed

  @integration @responsive-layout
  Scenario: Clear button in responsive layout changes
    Given I am on a desktop view
    And I have typed "responsive test" into the search input field
    When I resize the browser to mobile view
    Then the clear button should remain functional
    And the clear button should be properly positioned in mobile layout
    When I click the clear button in mobile view
    Then the clear functionality should work identically to desktop

  @integration @url-state
  Scenario: Clear button and URL state management
    Given the application manages search state in URL parameters
    And I have performed a search that updates the URL
    When I click the clear button
    Then the URL should be updated to reflect the cleared state
    And browser back/forward should work correctly with cleared state
    And deep linking should respect the cleared state

  @integration @local-storage
  Scenario: Clear button and persistent state
    Given the application saves search preferences to local storage
    And I have customized search settings
    When I click the clear button
    Then search input and results should be cleared
    But user preferences should be preserved in local storage
    And search type should reset to default while preserving other settings

  @integration @search-history
  Scenario: Clear button and search history management
    Given the application tracks search history
    And I have performed multiple searches
    When I click the clear button
    Then the current search should be cleared
    But search history should remain intact
    And I should still be able to access previous searches

  @integration @analytics
  Scenario: Clear button analytics and tracking
    Given the application tracks user interactions
    When I click the clear button
    Then a clear button click event should be tracked
    And the analytics should record the state before clearing
    And subsequent interactions should be properly attributed

  @integration @performance
  Scenario: Clear button performance with large result sets
    Given I have searched and received 1000+ results
    And all results are rendered in the UI
    When I click the clear button
    Then the clear operation should complete quickly (under 100ms)
    And the UI should remain responsive during clearing
    And memory should be properly freed from cleared results

  @integration @accessibility-tools
  Scenario: Clear button with assistive technologies
    Given I am using a screen reader
    And I have typed "accessibility test" into the search input field
    When I navigate to the clear button
    Then the screen reader should announce "Clear search button"
    When I activate the clear button
    Then the screen reader should announce "Search cleared"
    And the screen reader should announce focus moving to search input

  @integration @progressive-enhancement
  Scenario: Clear button without JavaScript
    Given JavaScript is disabled in the browser
    When I view the search form
    Then the clear button should be hidden or gracefully degraded
    And the search functionality should still work without clear button
    And the form should remain usable

  @integration @multi-component-state
  Scenario: Clear button affecting multiple component states
    Given I have:
      | Component | State |
      | Search Type | Author |
      | Search Input | "Stephen King" |
      | Results Display | 25 books shown |
      | Loading Indicator | Hidden |
      | Error Message | None |
    When I click the clear button
    Then all components should update to cleared state:
      | Component | Expected State |
      | Search Type | General Search |
      | Search Input | Empty and focused |
      | Results Display | No books shown |
      | Loading Indicator | Hidden |
      | Error Message | None |

  @integration @component-communication
  Scenario: Clear button event propagation
    Given multiple components listen for clear events
    When I click the clear button
    Then the clear event should be properly emitted
    And all listening components should receive the event
    And components should update in the correct order
    And no component should miss the clear event

  @integration @concurrent-user-actions
  Scenario: Clear button during concurrent user interactions
    Given I am typing in the search input field
    And another user action is occurring (like hovering over results)
    When I click the clear button while typing
    Then the clear action should take precedence
    And any conflicting actions should be resolved gracefully
    And the UI should end up in a consistent cleared state

  @integration @undo-redo
  Scenario: Clear button in undo/redo scenarios
    Given the application supports undo functionality
    And I have typed "undo test" into the search input field
    When I click the clear button
    And then trigger an undo action
    Then the previous search state should be restored
    And all related components should be restored consistently
    And the clear button state should match the restored input state