# Cypress Visual Tests strategy

## Problem

The [Visual tests placing](./05-visual-tests-placing.md) decision stated when to decide between Cypress and Storybook tests.
However, it is not entirely clear which components need screenshots, for which states, and how to combine them, so that Picasso can have visual testing done efficiently.

### What is a visual test?

> A visual test (a screenshot comparison) asserts one or more visual states of the component under test.

### Writing visual tests in Cypress

**Guiding principle**: Minimize the number of screenshots by maximizing test cases covered per screenshot.

**Helpful steps**
1. Identify **missing** test cases for the component under test by checking:
- CSS assertions in Jest and Cypress
- Storybook enabled and disabled visual tests
- Cypress visual tests
2. Write the identified missing test cases
3. Combine the **identified missing test cases** with the **existing test cases** for different aspects of the same component; *e.g. size and color*
4. Implement or modify tests according to the combined test cases
5. Disable unnecessary Storybook screenshots and clean up redundant tests

**Notes**

1. In the context of this document:
- a *test* is the whole test, with the code block
- a *test case* is only the text describing it in `it` examples
  - example of a *test case*: `it('focuses the input', () => {}`
2. Validating the Happo screenshots refers to comparing them to the Picasso Temploy live component.

### Example

One of the best examples can be found at: [Drawer tests](https://github.com/toptal/picasso/pull/2856/files#r890956818)

In short, testing the width of the `Drawer` component can be combined with other aspects, such as custom titles addition and notifications.
This reduces the number of screenshots needed while maintaining and improving visual test coverage.
