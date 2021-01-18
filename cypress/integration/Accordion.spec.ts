const toggleAccordion = () => cy.get('[data-testid=trigger]').click()
const getAccordionContent = () => cy.get('[data-testid=content]')
const clickStartInterviewOnboarding = () =>
  cy.get('[data-testid="start-onboarding"]').click()

describe('Accordion with custom summary', () => {
  beforeEach(() => {
    cy.visit('iframe.html?id=accordion--custom-summary')
  })

  it('closes and opens', () => {
    toggleAccordion()
    getAccordionContent().should('not.be.visible')
    // TODO: Add visual regression test
    toggleAccordion()
    getAccordionContent().should('be.visible')
    // TODO: Add visual regression test
  })

  it('interacts with accordion content', () => {
    clickStartInterviewOnboarding()
    // TODO: Add visual regression test

    cy.on('window:alert', text => {
      expect(text).toEqual('Onboarding started')
    })
  })
})
