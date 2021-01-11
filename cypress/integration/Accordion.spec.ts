const toggleAccordion = () => cy.get('[data-testid=trigger]').click()
const getAccordionContent = () => cy.get('[data-testid=content]')
const clickStartInterviewOnboarding = () =>
  cy.get('[data-testid="start-onboarding"]').click()

describe('Accordion with custom summary', () => {
  beforeEach(() => {
    cy.visit('iframe.html?id=accordion--custom-summary')
  })

  it('closes and opens accordion', () => {
    toggleAccordion()
    getAccordionContent().should('not.be.visible')
    toggleAccordion()
    getAccordionContent().should('be.visible')
  })

  it('interacts with accordion content', () => {
    clickStartInterviewOnboarding()
    cy.on('window:alert', text => {
      expect(text).toEqual('Onboarding started')
    })
  })
})
