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

    // our data-testid's are not being passed to the input
    cy.get('input').first().focus().get('body').happoScreenshot({
      component,
      variant: 'default-unchecked/after-focused',
    })
    cy.get('input').last().focus().get('body').happoScreenshot({
      component,
      variant: 'default-checked/after-focused',
    })
  })
})
