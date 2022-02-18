import React from 'react'
import { mount } from '@cypress/react'
import { PasswordInput } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const PasswordInputExample = () => <PasswordInput value='asd' />

describe('PasswordInput', () => {
  it('renders', () => {
    mount(
      <TestingPicasso>
        <PasswordInputExample />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('shows password after toggle click', () => {
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
