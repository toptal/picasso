import React from 'react'
import { mount } from '@cypress/react'
import { Button, Container } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

describe('Button.Checkbox', () => {
  it('renders different sizes', () => {
    mount(
      <TestingPicasso>
        <Container>
          <Button.Checkbox size='small'>Button</Button.Checkbox>
          <Button.Checkbox size='medium'>Button</Button.Checkbox>
          <Button.Checkbox size='large'>Button</Button.Checkbox>
        </Container>
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })

  it('renders different states', () => {
    mount(
      <TestingPicasso>
        <Container>
          <Button.Checkbox hovered>Button</Button.Checkbox>
          <Button.Checkbox focused>Button</Button.Checkbox>
          <Button.Checkbox active>Button</Button.Checkbox>
          <Button.Checkbox disabled>Button</Button.Checkbox>
          <Button.Checkbox disabled checked>
            Button
          </Button.Checkbox>
        </Container>
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })
})
