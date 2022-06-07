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

    cy.getByTestId('checkbox-unchecked').realHover()
    cy.get('body').happoScreenshot()

    cy.getByTestId('checkbox-checked').realHover()
    cy.get('body').happoScreenshot()

    cy.getByTestId('checkbox-unchecked').realClick()
    cy.get('body').happoScreenshot()

    cy.getByTestId('checkbox-checked').realClick()
    cy.get('body').happoScreenshot()
  })
})
