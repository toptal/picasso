import React from 'react'
import { PasswordInput, PasswordInputProps } from '@toptal/picasso'

const PasswordInputExample = ({ status }: Partial<PasswordInputProps>) => (
  <PasswordInput
    value='asd'
    status={status}
    testIds={{
      input: 'password-input',
      toggle: 'password-input-toggle',
      validIcon: 'valid-icon',
    }}
  />
)

const component = 'PasswordInput'

describe('PasswordInput', () => {
  describe('when toggle button clicked', () => {
    it('shows password', () => {
      cy.mount(<PasswordInputExample />)
      cy.get('body').happoScreenshot({
        component,
        variant: 'default/before-toggle-clicked',
      })

      cy.getByTestId('password-input-toggle').click()

      cy.get('body').happoScreenshot({
        component,
        variant: 'default/before-toggle-clicked',
      })
    })
  })

  describe('when in a valid state', () => {
    it('shows valid icon', () => {
      cy.mount(<PasswordInputExample status='success' />)

      cy.get('body').happoScreenshot({
        component,
        variant: 'success-state',
      })
    })
  })
})
