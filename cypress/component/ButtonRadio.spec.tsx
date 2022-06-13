import React from 'react'
import { Button, Container } from '@toptal/picasso'

describe('Button.Radio', () => {
  it('renders different sizes', () => {
    cy.mount(
      <Container>
        <Button.Radio size='small'>Button</Button.Radio>
        <Button.Radio size='medium'>Button</Button.Radio>
        <Button.Radio size='large'>Button</Button.Radio>
      </Container>
    )

    cy.get('body').happoScreenshot()
  })

  it('renders different states', () => {
    cy.mount(
      <Container>
        <Button.Radio hovered>Button</Button.Radio>
        <Button.Radio focused>Button</Button.Radio>
        <Button.Radio active>Button</Button.Radio>
        <Button.Radio disabled>Button</Button.Radio>
        <Button.Radio disabled checked>
          Button
        </Button.Radio>
      </Container>
    )

    cy.get('body').happoScreenshot()
  })
})
