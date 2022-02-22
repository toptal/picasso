import React from 'react'
import { mount } from '@cypress/react'
import { PasswordInput } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const PasswordInputExample = () => (
  <PasswordInput value='asd' data-testid='password-input' />
)

describe('PasswordInput', () => {
  describe('shows password after toggle click', () => {
    it('renders', () => {
      mount(
        <TestingPicasso>
          <PasswordInputExample />
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()

      cy.get('[data-testid="password-input-toggle"]').click()

      cy.get('body').happoScreenshot()
    })
  })
})
