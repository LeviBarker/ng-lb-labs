Feature: Example feature
  Scenario: Open Angular App
    Given the user is an admin
    When the user navigates to the home page
    Then the user should see "Continue with Google"
    And the page title should change to "Welcome"
