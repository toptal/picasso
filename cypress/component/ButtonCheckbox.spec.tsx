import React from 'react'
import { Button, Container } from '@toptal/picasso'

const component = 'ButtonCheckbox'

describe('Button.Checkbox', () => {
  it('renders different sizes', () => {
    cy.mount(
      <Container>
        <Button.Checkbox size='small'>Button</Button.Checkbox>
        <Button.Checkbox size='medium'>Button</Button.Checkbox>
        <Button.Checkbox size='large'>Button</Button.Checkbox>
      </Container>
    )

    cy.get('body').happoScreenshot({
      component,
      variant: 'all-sizes',
    })
  })

  it('renders different states', () => {
    cy.mount(
      <Container>
        <Button.Checkbox hovered>Button</Button.Checkbox>
        <Button.Checkbox focused>Button</Button.Checkbox>
        <Button.Checkbox active>Button</Button.Checkbox>
        <Button.Checkbox disabled>Button</Button.Checkbox>
        <Button.Checkbox disabled checked>
          Button
        </Button.Checkbox>
      </Container>
    )

    cy.get('body').happoScreenshot({
      component,
      variant: 'all-states',
    })
  })
})
