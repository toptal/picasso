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

const component = 'Checkbox'

describe('Checkbox', () => {
  it('renders', () => {
    cy.mount(<TestCheckbox />)

    cy.getByTestId('checkbox-unchecked').hoverAndTakeHappoScreenshot({
      component,
      variant: 'default-unchecked/after-hovered',
    })

    cy.getByTestId('checkbox-checked').hoverAndTakeHappoScreenshot({
      component,
      variant: 'default-checked/after-hovered',
    })

    cy.getByTestId('checkbox-unchecked')
      .find('input') // our data-testid's are not being passed to the input
      .focus()
      .trigger('focus') // since `focus` is not an action command, we need to trigger it
      .get('body')
      .happoScreenshot({
        component,
        variant: 'default-unchecked/after-focused',
      })

    cy.getByTestId('checkbox-checked')
      .find('input') // our data-testid's are not being passed to the input
      .focus()
      .trigger('focus') // since `focus` is not an action command, we need to trigger it
      .get('body')
      .happoScreenshot({
        component,
        variant: 'default-checked/after-focused',
      })
  })
})
