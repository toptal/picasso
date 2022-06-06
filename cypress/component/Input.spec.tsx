import React from 'react'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'
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

const COMPONENT = 'Input'

describe('Input', () => {
  it("renders Input's hovered and focused states", () => {
    mount(
      <TestingPicasso>
        <TestInput />
      </TestingPicasso>
    )

    // happo doesn't retain hover state but it has a workaround
    // "data-happo-hover" is being added and removed to mimic the state
    cy.getByTestId('default-input')
      .as('default-input')
      .invoke('attr', 'data-happo-hover', true)
      .get('body')
      .happoScreenshot({
        component: COMPONENT,
        variant: 'default/after-hovered',
      })
    cy.get('@default-input').invoke('removeAttr', 'data-happo-hover')
    cy.get('@default-input').realClick().get('body').happoScreenshot({
      component: COMPONENT,
      variant: 'default/after-focused',
    })

    cy.getByTestId('error-input')
      .as('error-input')
      .invoke('attr', 'data-happo-hover', true)
      .get('body')
      .happoScreenshot({
        component: COMPONENT,
        variant: 'error-status/after-hovered',
      })
    cy.get('@error-input').invoke('removeAttr', 'data-happo-hover')
    cy.get('@error-input').realClick().get('body').happoScreenshot({
      component: COMPONENT,
      variant: 'error-status/after-hovered',
    })
  })
})
