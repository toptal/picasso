import React from 'react'
import { NumberInput, NumberInputProps } from '@toptal/picasso'

const NumberInputExample = ({ status }: Partial<NumberInputProps>) => (
  <NumberInput
    value='10'
    status={status}
    testIds={{
      validIcon: 'valid-icon',
    }}
  />
)

const component = 'NumberInput'

describe('NumberInput', () => {
  it('renders', () => {
    cy.mount(<NumberInputExample />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'default',
    })
  })

  describe('when in a valid state', () => {
    it('shows valid icon', () => {
      cy.mount(<NumberInputExample status='success' />)

      cy.get('body').happoScreenshot({
        component,
        variant: 'valid',
      })
    })
  })

  describe('when in an invalid state', () => {
    it('shows error', () => {
      cy.mount(<NumberInputExample status='error' />)

      cy.get('body').happoScreenshot({
        component,
        variant: 'error',
      })
    })
  })
})
