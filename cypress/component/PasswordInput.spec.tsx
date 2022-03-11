import React from 'react'
import { mount } from '@cypress/react'
import { PasswordInput, PasswordInputProps } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const PasswordInputExample = ({
  validateStatus
}: Partial<PasswordInputProps>) => (
  <TestingPicasso>
    <PasswordInput
      value='asd'
      validateStatus={validateStatus}
      testIds={{
        input: 'password-input',
        toggle: 'password-input-toggle',
        validIcon: 'valid-icon'
      }}
    />
  </TestingPicasso>
)

describe('PasswordInput', () => {
  describe('when toggle button clicked', () => {
    it('shows password', () => {
      mount(<PasswordInputExample />)
      cy.get('body').happoScreenshot()

      cy.get('[data-testid="password-input-toggle"]').click()

      cy.get('body').happoScreenshot()
    })
  })

  describe('when validateStatus equals to success', () => {
    it('shows valid icon', () => {
      mount(<PasswordInputExample validateStatus='success' />)

      cy.get('[data-testid="valid-icon"]').should('be.visible')
      cy.get('body').happoScreenshot()
    })
  })
})
