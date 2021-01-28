const openSelectWithTab = () => {
  // @ts-ignore
  cy.get('body').tab()
}

const setThresholdToHideSelectSearch = () => {
  cy.get('[data-testid=input-threshold]')
    .type('{backspace}')
    .type('6')
}

const getNativeSelect = () => cy.get('select').eq(1)

describe('Select', () => {
  it('focuses Select with and without a search', () => {
    cy.visit('iframe.html?id=select--search-behavior')

    openSelectWithTab()

    cy.get('[role=menu]').should('not.be.visible')

    setThresholdToHideSelectSearch()

    openSelectWithTab()
    cy.get('[role=menu]').should('not.be.visible')

    cy.get('[data-testid=select]').type(' ')
    cy.get('[role=menu]').should('be.visible')
  })

  it('changes NativeSelect value', () => {
    cy.visit('iframe.html?id=select--native')

    getNativeSelect().should('be.visible')
    getNativeSelect().select('1')
    cy.get('option[role=option][value=1]')
      .should('have.attr', 'aria-selected')
      .and('match', /true/)
  })
})
