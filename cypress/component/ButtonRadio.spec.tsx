import React from 'react'
import { mount } from '@cypress/react'
import { Button, Container } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

describe('Button.Radio', () => {
  it('renders different sizes', () => {
    mount(
      <TestingPicasso>
        <Container>
          <Button.Radio size='small'>Button</Button.Radio>
          <Button.Radio size='medium'>Button</Button.Radio>
          <Button.Radio size='large'>Button</Button.Radio>
        </Container>
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })

  it('renders different states', () => {
    mount(
      <TestingPicasso>
        <Container>
          <Button.Radio hovered>Button</Button.Radio>
          <Button.Radio focused>Button</Button.Radio>
          <Button.Radio active>Button</Button.Radio>
          <Button.Radio disabled>Button</Button.Radio>
          <Button.Radio disabled checked>
            Button
          </Button.Radio>
        </Container>
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })
})
