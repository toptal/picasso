import React from 'react'
import { mount } from '@cypress/react'
import { Button, Container } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

describe('ButtonAction', () => {
  it('renders', () => {
    mount(
      <TestingPicasso>
        <Button.Action>Test</Button.Action>

        <Container variant='blue'>
          <Button.Action>Test</Button.Action>
        </Container>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
})
