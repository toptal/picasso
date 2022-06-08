import React from 'react'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { Checkbox, Container } from '@toptal/picasso'

const TestCheckbox = () => (
  <TestingPicasso>
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
  </TestingPicasso>
)

describe('Checkbox', () => {
  it('renders', () => {
    mount(<TestCheckbox />)

    // looks like happo doesn't work with hover pseudo-class properly
    // these happo screenshots disabled for now until we get helped by happo side
    // cy.getByTestId('checkbox-unchecked').realHover().get('body').happoScreenshot()
    // cy.getByTestId('checkbox-checked').realHover().get('body').happoScreenshot()

    // our data-testid's are not being passed to the input
    cy.get('input').first().focus().get('body').happoScreenshot()
    cy.get('input').last().focus().get('body').happoScreenshot()
  })
})
