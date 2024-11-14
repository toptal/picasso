import React from 'react'
import { Container, Input } from '@toptal/picasso'

const TestInput = () => {
  return (
    <Container padded='medium'>
      <Container padded='small'>
        <Input value='Text' data-testid='default-input' />
      </Container>
      <Container padded='small'>
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

  it('shows the `X` when hover over the input', () => {
    cy.mount(
      <Container padded='small'>
        <Input
          enableReset
          value='Text'
          testIds={{ resetButton: 'reset-button' }}
        />
      </Container>
    )

    cy.getByTestId('reset-button').should('not.be.visible')
    // making sure that we hover over the very end of the input not just the text of the input
    cy.getByTestId('reset-button').realHover()
    cy.getByTestId('reset-button').should('be.visible')
  })
})
