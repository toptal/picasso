const openAutocompleteWithTab = () => {
  // @ts-ignore
  cy.get('body').tab()
}

describe('Autocomplete', () => {
  it('focuses Autocomplete with dynamic options should not open options list', () => {
    cy.visit('iframe.html?id=autocomplete--dynamic-options')

    openAutocompleteWithTab()

    cy.get('[role=menu]').should('not.be.visible')

    cy.clock()
    cy.get('[data-testid=autocomplete]').type('Mon')
    cy.tick(1500)
    cy.clock().invoke('restore')

    cy.get('[role=menu]').should('be.visible')

    cy.get('[data-testid=autocomplete]').blur()
    openAutocompleteWithTab()
    cy.get('[role=menu]').should('not.be.visible')
  })

  it('focuses Autocomplete with prefedined options should open options list', () => {
    cy.visit('iframe.html?id=autocomplete--default')

    openAutocompleteWithTab()

    cy.get('[role=menu]').should('be.visible')

    cy.get('[data-testid=autocomplete]').type('Ukr')
    cy.get('[role=menu]').should('be.visible')

    cy.get('[data-testid=autocomplete]').blur()
    openAutocompleteWithTab()
    cy.get('[role=menu]').should('be.visible')
  })
})
