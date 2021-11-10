declare namespace Cypress {
  interface Chainable<Subject> {
    isWithinViewport(): Chainable<Subject>
    pseudo(name: 'before' | 'after', property: string): Chainable<Subject>
  }
}
