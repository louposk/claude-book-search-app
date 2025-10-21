Feature: Clear Button Accessibility and Edge Cases
  As a user with diverse abilities and technical constraints
  I want the clear button to be fully accessible and handle edge cases gracefully
  So that I can use the book search application regardless of my abilities or technical setup

  Background:
    Given I am on the book search application
    And accessibility features are enabled

  @accessibility @screen-reader
  Scenario: Clear button screen reader compatibility
    Given I am using a screen reader
    When I navigate to the clear button
    Then the screen reader should announce "Clear search, button"
    When the clear button is disabled
    Then the screen reader should announce "Clear search, button, unavailable"
    When I type "test" into the search input
    Then the screen reader should announce "Clear search, button"
    When I activate the clear button with screen reader
    Then the screen reader should announce "Search cleared, edit box focused"

  @accessibility @high-contrast
  Scenario: Clear button in high contrast mode
    Given I have enabled high contrast mode
    When I view the clear button
    Then the clear button should have sufficient contrast ratio (4.5:1 minimum)
    And the clear button border should be visible in high contrast
    When the clear button is disabled
    Then the disabled state should be clearly distinguishable
    When I hover over the enabled clear button
    Then the hover state should maintain sufficient contrast

  @accessibility @reduced-motion
  Scenario: Clear button with reduced motion preferences
    Given I have enabled reduced motion preferences
    And I have typed "motion test" into the search input field
    When I hover over the clear button
    Then animations should be reduced or disabled
    And the hover effect should still provide visual feedback
    When I click the clear button
    Then any transition effects should respect reduced motion preferences

  @accessibility @zoom-levels
  Scenario Outline: Clear button at different zoom levels
    Given I have set browser zoom to <zoom_level>
    And I have typed "zoom test" into the search input field
    When I view the clear button
    Then the clear button should remain fully functional
    And the clear button should be properly sized for interaction
    And the clear button text should remain readable
    And the clear button should not overlap other elements

    Examples:
      | zoom_level |
      | 50%        |
      | 100%       |
      | 150%       |
      | 200%       |
      | 400%       |

  @accessibility @keyboard-only
  Scenario: Clear button keyboard-only navigation
    Given I am navigating using keyboard only
    And I have typed "keyboard test" into the search input field
    When I press Tab to navigate to the clear button
    Then the clear button should receive visible focus
    And the focus indicator should meet accessibility guidelines
    When I press Enter on the clear button
    Then the clear action should execute
    When I press Space on the clear button
    Then the clear action should execute
    When the clear button is disabled
    Then it should not receive keyboard focus during tab navigation

  @accessibility @voice-control
  Scenario: Clear button voice control compatibility
    Given I am using voice control software
    When I say "click clear button"
    Then the voice control should identify the clear button
    And the clear action should execute
    When the clear button is disabled
    Then voice control should indicate the button is unavailable

  @edge-case @unicode-input
  Scenario Outline: Clear button with Unicode and special characters
    Given I have typed "<unicode_input>" into the search input field
    When I click the clear button
    Then the search input should be completely empty
    And no Unicode characters should remain
    And the clear button should become disabled

    Examples:
      | unicode_input |
      | café          |
      | 北京          |
      | 🔍📚          |
      | مكتبة         |
      | тест          |
      | ñoño          |

  @edge-case @extremely-long-input
  Scenario: Clear button with extremely long input
    Given I have typed a 10,000 character string into the search input field
    When I click the clear button
    Then the entire input should be cleared efficiently
    And the clear operation should complete within 500ms
    And the browser should remain responsive
    And no memory issues should occur

  @edge-case @special-characters
  Scenario: Clear button with special HTML characters
    Given I have typed "<script>alert('test')</script>" into the search input field
    When I click the clear button
    Then the input should be safely cleared
    And no script execution should occur
    And the clear button should function normally

  @edge-case @rapid-typing
  Scenario: Clear button during rapid typing
    Given I am typing very rapidly in the search input field
    When I click the clear button while typing
    Then the clear action should interrupt the typing
    And the search input should become empty
    And subsequent typing should work normally

  @edge-case @browser-autofill
  Scenario: Clear button with browser autofill
    Given the browser has autofilled the search input
    And the clear button is enabled due to autofilled content
    When I click the clear button
    Then the autofilled content should be cleared
    And the clear button should become disabled
    And the autofill dropdown should be dismissed

  @edge-case @copy-paste
  Scenario: Clear button after copy-paste operations
    Given I have copied text from another application
    When I paste the text into the search input field
    And I click the clear button
    Then the pasted content should be completely cleared
    And the clipboard should remain unchanged

  @edge-case @browser-back-forward
  Scenario: Clear button state after browser navigation
    Given I have typed "navigation test" and performed a search
    When I navigate to another page using browser controls
    And I use browser back button to return
    And the previous state is restored
    When I click the clear button
    Then the search should be cleared properly
    And all components should reset to initial state

  @edge-case @tab-switching
  Scenario: Clear button state persistence across tab switches
    Given I have typed "tab switch test" into the search input field
    When I switch to another browser tab
    And return to the application tab
    Then the clear button should maintain its enabled state
    When I click the clear button
    Then the clear functionality should work normally

  @edge-case @memory-pressure
  Scenario: Clear button under memory pressure
    Given the system is under high memory pressure
    And I have performed multiple searches creating large result sets
    When I click the clear button
    Then the clear operation should complete successfully
    And memory should be properly freed
    And the application should remain stable

  @edge-case @slow-device
  Scenario: Clear button on slow devices
    Given I am using a slow/older device
    And I have typed "performance test" into the search input field
    When I click the clear button
    Then the clear operation should complete within reasonable time
    And the UI should provide appropriate feedback
    And the device should remain responsive

  @edge-case @network-offline
  Scenario: Clear button functionality when offline
    Given the application is in offline mode
    And I have typed "offline test" into the search input field
    When I click the clear button
    Then the clear functionality should work normally
    And should not depend on network connectivity
    And the offline state should be maintained

  @edge-case @javascript-errors
  Scenario: Clear button resilience to JavaScript errors
    Given there are JavaScript errors in the console
    And I have typed "error resilience" into the search input field
    When I click the clear button
    Then the clear functionality should work despite errors
    And the button should remain functional
    And error recovery should be graceful

  @edge-case @css-disabled
  Scenario: Clear button functionality with CSS disabled
    Given CSS styling is disabled in the browser
    When I view the clear button
    Then the clear button should still be identifiable as a button
    And the clear functionality should remain operational
    And the button should have appropriate fallback styling

  @edge-case @mixed-content
  Scenario: Clear button with mixed text content
    Given I have typed "Regular text 123 !@# émojis 🚀 العربية" into the search input field
    When I click the clear button
    Then all mixed content should be cleared completely
    And the input field should be truly empty
    And the clear button should reflect the empty state

  @edge-case @ime-input
  Scenario: Clear button with IME (Input Method Editor) input
    Given I am using an IME for Chinese/Japanese/Korean input
    And I have composed text using the IME in the search input
    When I click the clear button while IME is active
    Then the IME composition should be cancelled
    And the search input should be cleared
    And the IME should return to initial state

  @boundary @character-limits
  Scenario: Clear button at input field boundaries
    Given the search input field has a maximum character limit
    When I type text up to the character limit
    And I click the clear button
    Then the input should be cleared regardless of length
    And I should be able to type new content immediately
    And the character count should reset properly