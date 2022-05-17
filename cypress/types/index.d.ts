declare namespace Cypress {
  interface Chainable<Subject> {
    isWithinViewport(): Chainable<Subject>
    getByTestId(testId: string): Chainable<Subject>
    getByRole(role: string): Chainable<Subject>
  }
}
