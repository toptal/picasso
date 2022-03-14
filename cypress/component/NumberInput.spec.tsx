import React from 'react'
import { mount } from '@cypress/react'
import { NumberInput, NumberInputProps } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const NumberInputExample = ({ validateStatus }: Partial<NumberInputProps>) => (
  <TestingPicasso>
    <NumberInput
      value='10'
      validateStatus={validateStatus}
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

  describe('when validateStatus equals to success', () => {
    it('shows valid icon', () => {
      mount(<NumberInputExample validateStatus='success' />)

      cy.get('body').happoScreenshot()
    })
  })
})
