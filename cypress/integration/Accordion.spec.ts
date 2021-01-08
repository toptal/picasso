const clickAccordion = () => cy.get('[data-testid=trigger]').click()
const getAccordionContent = () => cy.get('[data-testid=content]')
const clickStartInterviewOnboarding = () =>
  cy.get('[data-testid="start-onboarding"]').click()

describe('Accordion', () => {
  beforeEach(() => {
    cy.visit('iframe.html?id=accordion--custom-summary')
  })

  it('closes and opens accordion', () => {
    clickAccordion()
    getAccordionContent().should('not.be.visible')
    clickAccordion()
    getAccordionContent().should('be.visible')
  })

  it('interacts with accordion content', () => {
    clickStartInterviewOnboarding()
    cy.on('window:alert', text => {
      expect(text).toEqual('Onboarding started')
    })
  })
})
