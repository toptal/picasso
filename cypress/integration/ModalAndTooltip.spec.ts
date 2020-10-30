describe('Modal and tooltip', () => {
  it('checks two tooltips on the page, one is inside modal', () => {
    // TODO: get url from story name
    cy.visit('iframe.html?id=modal--two-tooltips-on-the-page')

    // modal is loaded
    cy.get('#modal-container')

    cy.get('[data-testid="trigger"]').click()

    cy.get('[data-testid="datepicker"]').focus()

    cy.get('[data-testid="calendar"] button')
      .eq(10)
      .click()

    cy.get('[data-testid="datepicker"]').should('have.value', '11-03-2020')
  })
})
