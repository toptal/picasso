import React from 'react'
import { Container, Input } from '@toptal/picasso'
import { SPACING_6, SPACING_4 } from '@toptal/picasso/utils'

const TestInput = () => {
  return (
    <Container padded={SPACING_6}>
      <Container padded={SPACING_4}>
        <Input value='Text' data-testid='default-input' />
      </Container>
      <Container padded={SPACING_4}>
        <Input value='Text' data-testid='error-input' status='error' />
      </Container>
    </Container>
  )
}

const component = 'Input'

describe('Input', () => {
  it("renders Input's hovered and focused states", () => {
    cy.mount(<TestInput />)

    cy.getByTestId('default-input')
      .as('default-input')
      .hoverAndTakeHappoScreenshot({
        component,
        variant: 'default/after-hovered',
      })

    cy.get('@default-input').realClick().get('body').happoScreenshot({
      component,
      variant: 'default/after-focused',
    })
    cy.get('@default-input').blur()

    cy.getByTestId('error-input')
      .as('error-input')
      .hoverAndTakeHappoScreenshot({
        component,
        variant: 'error-status/after-hovered',
      })

    cy.get('@error-input').realClick().get('body').happoScreenshot({
      component,
      variant: 'error-status/after-focused',
    })
  })
})
