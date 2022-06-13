import React from 'react'
import { Button, Container } from '@toptal/picasso'

describe('ButtonAction', () => {
  it('renders', () => {
    cy.mount(
      <>
        <Button.Action>Test</Button.Action>

        <Container variant='blue'>
          <Button.Action>Test</Button.Action>
        </Container>
      </>
    )
    cy.get('body').happoScreenshot()
  })
})
