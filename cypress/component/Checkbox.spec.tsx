import React from 'react'
import { Checkbox, Container } from '@toptal/picasso'

const TestCheckbox = () => (
  <Container padded='medium'>
    <Checkbox.Group>
      <Checkbox
        checked={false}
        data-testid='checkbox-unchecked'
        label='Unchecked'
      />
      <Checkbox checked data-testid='checkbox-checked' label='Checked' />
    </Checkbox.Group>
  </Container>
)

describe('Checkbox', () => {
  it('renders', () => {
    cy.mount(<TestCheckbox />)

    // happo doesn't retain hover state but it has a workaround
    // "data-happo-hover" is being added and removed to mimic the state
    cy.getByTestId('checkbox-unchecked')
      .invoke('attr', 'data-happo-hover', true)
      .get('body')
      .happoScreenshot()
    cy.getByTestId('checkbox-unchecked').invoke(
      'removeAttr',
      'data-happo-hover'
    )

    cy.getByTestId('checkbox-checked')
      .invoke('attr', 'data-happo-hover', true)
      .get('body')
      .happoScreenshot()
    cy.getByTestId('checkbox-checked').invoke('removeAttr', 'data-happo-hover')

    // our data-testid's are not being passed to the input
    cy.get('input').first().focus().get('body').happoScreenshot()
    cy.get('input').last().focus().get('body').happoScreenshot()
  })
})
