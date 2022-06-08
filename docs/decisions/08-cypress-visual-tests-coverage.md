# Cypress Visual Tests coverage

## Problem

The `./05-visual-tests-placing.md` decision stated when to decide between Cypress and Storybook tests.
However, it is not entirely clear which components need screenshots, for which states, and how to combine them, so that Picasso can have visual testing done efficiently.

### What is a visual test?

> A visual test (a screenshot comparison) asserts one or more non-overlapping visual states of the component under test.

### Doing Visual Tests outside of Storybook

There are 5 bottom-up steps to follow:
1. Assert the current test coverage by checking:
- functional tests from Jest and Cypress visual/css assertions
- disabled Storybook visual tests
- Cypress visual tests
2. Write the missing test cases descriptions (no code just yet) for:
- migrating existing Jest and Cypress visual/ css assertions
- visual state transition results due to interacting with the component
3. Combine non-overlapping test case descriptions
4. Implement the code for the combined test cases and validate screenshots in the Happo report
5. Disable unnecessary Storybook screenshots and clean up assertions covered by visual tests

### Example

One of the best examples can be found at: [Drawer tests](https://github.com/toptal/picasso/pull/2856/files#r890956818)

In short, testing the width of the `Drawer` component can be combined with other aspects, such as custom titles addition and notifications.
This reduces the number of screenshots needed while maintaining and improving coverage.
