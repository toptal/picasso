import React from 'react'
import { Stepper, StepperProps, Container } from '@toptal/picasso'

const TestStepper = ({ overflowEllipsis }: Partial<StepperProps> = {}) => (
  <Container style={{ width: '400px' }}>
    <Stepper
      data-testid='stepper'
      overflowEllipsis={overflowEllipsis}
      steps={['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']}
    />
  </Container>
)

const component = 'Stepper'

describe('Stepper', () => {
  describe('when overflow ellipsis is not enabled', () => {
    it('renders stepper without tooltip on hover', () => {
      cy.mount(<TestStepper overflowEllipsis={false} />)

      cy.getByTestId('stepper').find('span').last().trigger('click')

      cy.getByRole('tooltip').should('not.exist')

      cy.get('body').happoScreenshot({
        component,
        variant: 'stepper/when-overflow-ellipsis-disabled',
      })
    })
  })

  describe('when overflow ellipsis is enabled', () => {
    it('renders stepper with tooltip on hover', () => {
      cy.mount(<TestStepper overflowEllipsis />)

      cy.getByTestId('stepper').find('span').last().trigger('click')

      cy.getByRole('tooltip').contains('Step 5').should('be.visible')

      cy.get('body').happoScreenshot({
        component,
        variant: 'stepper/when-overflow-ellipsis-enabled',
      })
    })
  })
})
