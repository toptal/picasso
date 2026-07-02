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

    // Stamp `data-focused` on the Root span before each snapshot — Base UI's
    // own state attribute, which also drives the focus-ring styles. Doing it
    // manually mirrors the `hoverAndTakeHappoScreenshot` pattern: `:focus-visible`
    // is a live pseudo-class that doesn't survive Happo's DOM serialization.
    cy.get('[role="checkbox"]').first().invoke('attr', 'data-focused', '')
    cy.get('body').happoScreenshot({
      component,
      variant: 'default-unchecked/after-focused',
    })
    cy.get('[role="checkbox"]').first().invoke('removeAttr', 'data-focused')

    cy.get('[role="checkbox"]').last().invoke('attr', 'data-focused', '')
    cy.get('body').happoScreenshot({
      component,
      variant: 'default-checked/after-focused',
    })
    cy.get('[role="checkbox"]').last().invoke('removeAttr', 'data-focused')
  })
})
