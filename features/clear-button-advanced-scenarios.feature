Feature: Clear Button Advanced UI Scenarios
  As a user of the book search application
  I want comprehensive clear button functionality
  So that I can have a reliable and intuitive search experience

  Background:
    Given I am on the book search application
    And the search form is loaded completely

  @visual-feedback @clear-button
  Scenario Outline: Clear button visual feedback for different input states
    Given the search input field contains "<input_text>"
    When I observe the clear button state
    Then the clear button should be "<expected_state>"
    And the clear button cursor should be "<cursor_type>"
    And the clear button should have "<visual_style>" styling

    Examples:
      | input_text     | expected_state | cursor_type   | visual_style |
      |                | disabled       | not-allowed   | disabled     |
      | a              | enabled        | pointer       | enabled      |
      | test query     | enabled        | pointer       | enabled      |
      |    spaces   only| disabled       | not-allowed   | disabled     |
      | 123            | enabled        | pointer       | enabled      |

  @focus-management @clear-button
  Scenario: Clear button focus management sequence
    Given I have typed "focus testing" into the search input field
    And the search input field has focus
    When I press Tab to navigate to the search button
    And I press Tab again to navigate to the clear button
    Then the clear button should have keyboard focus
    And the clear button should display focus ring styling
    When I press Enter on the clear button
    Then the search input field should be cleared
    And the search input field should automatically receive focus
    And the clear button should lose focus

  @animation @clear-button
  Scenario: Clear button animation and transition effects
    Given I have typed "animation test" into the search input field
    When I hover over the clear button
    Then the clear button should show smooth color transition
    And the clear button should show transform animation (translateY(-1px))
    And the transition should complete within 0.3 seconds
    When I move mouse away from the clear button
    Then the clear button should return to original state smoothly

  @click-feedback @clear-button
  Scenario: Clear button click feedback and states
    Given I have typed "click feedback" into the search input field
    When I press down (mousedown) on the clear button
    Then the clear button should show pressed state visual feedback
    When I release (mouseup) the clear button
    Then the clear button should return to normal state
    And the clear action should be executed
    And the search input should be empty

  @double-click @clear-button
  Scenario: Clear button double-click behavior
    Given I have typed "double click test" into the search input field
    When I double-click the clear button quickly
    Then the clear action should only execute once
    And no errors should occur
    And the search input field should remain empty
    And the clear button should remain disabled

  @touch-interaction @clear-button
  Scenario: Clear button touch interaction on mobile
    Given I am using a touch device
    And I have typed "touch interaction" into the search input field
    When I tap and hold the clear button
    Then the clear button should show visual feedback for touch interaction
    When I release the touch
    Then the clear action should execute
    And the virtual keyboard should remain visible for the focused search input

  @rapid-interaction @clear-button
  Scenario: Clear button rapid state changes
    Given the search input field is empty
    When I type "r" into the search input field
    Then the clear button should become enabled
    When I immediately clear the input by selecting all and deleting
    Then the clear button should become disabled instantly
    When I type "ra" into the search input field
    Then the clear button should become enabled again
    And the state transitions should be smooth and immediate

  @boundary-values @clear-button
  Scenario Outline: Clear button with boundary value inputs
    Given I type "<boundary_input>" into the search input field
    When I observe the clear button
    Then the clear button state should be "<expected_state>"
    When I click the clear button (if enabled)
    Then the search input should be "<final_input_state>"

    Examples:
      | boundary_input                    | expected_state | final_input_state |
      | \u0020                           | disabled       | unchanged         |
      | a\u0020                          | enabled        | empty             |
      | \u0020a                          | enabled        | empty             |
      | \u00A0                           | enabled        | empty             |
      | \t                               | enabled        | empty             |
      | \n                               | enabled        | empty             |

  @css-class-verification @clear-button
  Scenario: Clear button CSS class states
    Given the search input field is empty
    When I inspect the clear button
    Then the clear button should have CSS class "clear-button"
    And the clear button should have disabled attribute
    When I type "css test" into the search input field
    Then the clear button should still have CSS class "clear-button"
    And the clear button should not have disabled attribute

  @aria-attributes @clear-button
  Scenario: Clear button ARIA attributes and accessibility
    Given the clear button is visible
    When I inspect the clear button accessibility attributes
    Then the clear button should have aria-label "Clear search"
    And the clear button should have type "button"
    And the clear button should be announced correctly by screen readers
    When the clear button is disabled
    Then screen readers should announce the disabled state
    When the clear button is enabled
    Then screen readers should announce the enabled state

  @form-integration @clear-button
  Scenario: Clear button integration with form submission
    Given I have typed "form integration" into the search input field
    And I am about to submit the form
    When I click the clear button before submitting
    Then the form should not be submitted
    And the search input should be empty
    And the search input should have focus for new input

  @memory-leak @clear-button
  Scenario: Clear button memory and performance
    Given I perform multiple clear operations
    When I type text and clear the input 100 times
    Then the application should remain responsive
    And no memory leaks should occur
    And the clear button should continue to function correctly

  @concurrent-operations @clear-button
  Scenario: Clear button during concurrent UI operations
    Given I have typed "concurrent test" into the search input field
    And I initiate a search operation
    When I quickly click the clear button while search is processing
    Then the search operation should be cancelled
    And the search input should be cleared
    And the loading state should be reset
    And no race conditions should occur

  @browser-compatibility @clear-button
  Scenario: Clear button cross-browser behavior
    Given I am testing in different browsers
    When I interact with the clear button
    Then the clear button should behave consistently across browsers
    And the CSS styling should render correctly
    And the focus management should work uniformly
    And the accessibility features should be supported

  @error-recovery @clear-button
  Scenario: Clear button error recovery
    Given a JavaScript error occurs during clear operation
    When I attempt to use the clear button after the error
    Then the clear button should recover and function normally
    And the UI should remain stable
    And subsequent clear operations should work correctly

  @viewport-changes @clear-button
  Scenario: Clear button behavior during viewport changes
    Given I have typed "viewport test" into the search input field
    When I resize the browser window
    Then the clear button should remain visible and functional
    And the clear button should adapt to responsive layout changes
    When I rotate the device (mobile)
    Then the clear button should maintain its functionality
    And the layout should adjust appropriately

  @network-conditions @clear-button
  Scenario: Clear button behavior under poor network conditions
    Given I am using a slow network connection
    And I have initiated a search that is taking time to load
    When I click the clear button
    Then the clear operation should execute immediately
    And should not wait for network operations to complete
    And the local UI state should be updated instantly