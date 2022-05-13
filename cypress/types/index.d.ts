declare namespace Cypress {
  interface Chainable<Subject> {
    isWithinViewport(): Chainable<Subject>
    getByTestId(testId: string): Chainable<Subject>
    findByTestId(testId: string): Chainable<Subject>
  }
}
