import React from 'react'
import { mount } from '@cypress/react'
import { Button, Container } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

describe('Button.Radio', () => {
  it('renders', () => {
    mount(
      <TestingPicasso>
        <Container>
          <Button.Radio size='small'>Button</Button.Radio>
          <Button.Radio size='medium'>Button</Button.Radio>
          <Button.Radio size='large'>Button</Button.Radio>
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
