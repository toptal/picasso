import React from 'react'
import { mount } from '@cypress/react'
import { NumberInput, NumberInputProps } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const NumberInputExample = ({ status }: Partial<NumberInputProps>) => (
  <TestingPicasso>
    <NumberInput
      value='10'
      status={status}
      testIds={{
        validIcon: 'valid-icon'
      }}
    />
  </TestingPicasso>
)

describe('NumberInput', () => {
  it('renders', () => {
    mount(<NumberInputExample />)

    cy.get('body').happoScreenshot()
  })

  describe('when in a valid state', () => {
    it('shows valid icon', () => {
      mount(<NumberInputExample status='success' />)

      cy.get('body').happoScreenshot()
    })
  })
})
