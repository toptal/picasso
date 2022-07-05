# Cypress Visual Tests strategy

# Table of contents

1. [Problem](#problem)
2. [Definitions](#definitions)
    * [What is a test?](#what-is-a-test)
    * [What is a visual test?](#what-is-a-visual-test)
    * [What is a test case?](#what-is-a-test-case)
    * [What is Happo screenshots validation?](#what-is-happo-screenshots-validation)
    * [What is a CSS assertion?](#what-is-a-css-assertion)
3. [Writing visual tests in Cypress](#writing-visual-tests-in-cypress)
    * [Guiding principle](#guiding-principle)
    * [Helpful steps](#helpful-steps)
    * [Example](#example)

## Problem

The [Visual tests placing](./05-visual-tests-placing.md) decision stated how to decide between Cypress and Storybook tests.
However, it is not entirely clear which components need screenshots, for which states, and how to merge them, so that Picasso can have visual testing done efficiently.

## Definitions

### What is a test?

A _test_ is the whole test, with the code block.

Example:

```js
it('focuses the input', () => {
  cy.mount(<TestSelect />)

  cy.getByTestId('select').click().find('input').should('be.focused')
})
```

### What is a visual test?

A visual test (a screenshot comparison) asserts one or more visual states of the component under test.

Example:

```js
it('renders with regular width and title', () => {
  cy.mount(<TestDrawer width='regular' title='This is a regular Drawer' />)

  cy.getByTestId('trigger').click()

  cy.get('body').happoScreenshot({
    component,
    variant: 'regular-width/with-title',
  })
})
```

### What is a test case?

A _test case_ is only the text describing it in `it` examples

Example:
```js
it('focuses the input', () => {})
```

### What is Happo screenshots validation?

Happo screenshot validation's purpose is to ensure the saved screenshot is displayed correctly and according to its intended designs.

Validation can be achieved by comparing a Happo screenshot of a component and its:
- previous screenshot version if it exists
- Picasso Temploy live version

### What is a CSS assertion?

A CSS assertion is an expect block asserting a CSS value.

Examples:

In Jest:
```js
expect(cell).toHaveAttribute('style', 'background: red;')

expect(accordionContainer).toHaveStyle('display: table;')
```

In Cypress:
```js
cy.getByTestId('link')
  .realHover()
  .should(
    'have.css',
    'text-decoration',
    'underline solid rgb(32, 78, 207)'
  )
```

## Writing visual tests in Cypress

### Guiding principle

Minimize the number of screenshots by maximizing test cases covered per screenshot.

### Helpful steps

**For a new component**

Assuming a component is newly implemented along with Storybook examples, but without Cypress visual tests:
1. Identify test cases for the component under test by:
- identifying visually testable states; _e.g. size, color, focused_
- checking Storybook examples and their visual tests
2. Merge the **identified test cases** for different aspects of the same component; _e.g. size and color_
3. Implement tests according to the merged test cases
4. Disable redundant Storybook visual tests

**For an existing component**

1. Identify **missing** and **existing** test cases for the component under test by:
- identifying visually testable states; _e.g. size, color, focused_
- finding existing CSS assertions in Jest and Cypress
- identifying enabled and disabled Storybook visual tests
- checking existing Cypress visual tests
2. Merge the **identified missing test cases** with the **existing test cases** for different aspects of the same component; _e.g. size and color_
3. Modify tests according to the merged test cases
4. Disable unnecessary Storybook screenshots and clean up redundant tests

Screenshots created on Happo's side need to be [validated](#what-is-happo-screenshots-validation).

### Example

One of the best examples can be found at: [Drawer tests](https://github.com/toptal/picasso/pull/2856/files#r890956818)

In short, testing the width of the `Drawer` component can be merged with other aspects, such as custom titles addition and notifications.
This reduces the number of screenshots needed while maintaining and improving visual test coverage.
