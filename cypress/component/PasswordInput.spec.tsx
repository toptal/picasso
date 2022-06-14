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

describe('PasswordInput', () => {
  describe('when toggle button clicked', () => {
    it('shows password', () => {
      cy.mount(<PasswordInputExample />)
      cy.get('body').happoScreenshot()

      cy.get('[data-testid="password-input-toggle"]').click()

      cy.get('body').happoScreenshot()
    })
  })

  describe('when in a valid state', () => {
    it('shows valid icon', () => {
      cy.mount(<PasswordInputExample status='success' />)

      cy.get('body').happoScreenshot()
    })
  })
})
