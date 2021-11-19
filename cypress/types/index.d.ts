declare namespace Cypress {
  interface Chainable<Subject> {
    isWithinViewport(): Chainable<Subject>
  }
}
