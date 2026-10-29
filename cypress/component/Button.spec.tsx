import React from 'react'
import { Button, Container, Link, Tooltip } from '@toptal/picasso'

import { FOCUS_RING, toHaveStyle, toMatchFocusVisible } from '../support/focus'

const component = 'Button'

const TestLoadingButtonAction = () => (
  <>
    <button>Before</button>
    <Button.Action loading data-testid='button-action'>
      Action
    </Button.Action>
  </>
)

describe('Button', () => {
  describe('when used in Tooltip as Link', () => {
    it('renders without error', () => {
      cy.mount(
        <Container padded='small' flex gap='small'>
          <div>
            <Tooltip content='Tooltip content'>
              <Button as={Link} href='' data-testid='button-primary'>
                Button
              </Button>
            </Tooltip>
          </div>
          <div>
            <Button
              variant='secondary'
              data-testid='button-secondary'
              as={Link}
              href=''
            >
              Button
            </Button>
          </div>
          <div>
            <Button as={Link} href='' disabled>
              Button
            </Button>
          </div>
          <div>
            <Button variant='secondary' as={Link} href='' disabled>
              Button
            </Button>
          </div>
        </Container>
      )

      cy.get('body').happoScreenshot({
        component,
        variant: 'default',
      })

      cy.getByTestId('button-primary').hoverAndTakeHappoScreenshot({
        component,
        variant: 'default/after-primary-hovered',
      })

      cy.getByTestId('button-primary').hoverAndTakeHappoScreenshot({
        component,
        variant: 'default/after-secondary-hovered',
      })
    })
  })

  describe('when Button.Action is loading and focused', () => {
    it('shows focus ring on keyboard focus', () => {
      cy.mount(<TestLoadingButtonAction />)

      cy.contains('Before').realClick()
      cy.realPress('Tab')

      cy.getByTestId('button-action')
        .should('have.focus')
        .and(toMatchFocusVisible(true))
        .and(toHaveStyle('boxShadow', FOCUS_RING))
    })

    it('does not show focus ring on mouse focus', () => {
      cy.mount(<TestLoadingButtonAction />)

      cy.getByTestId('button-action').realClick()

      cy.getByTestId('button-action')
        .should('have.focus')
        .and(toMatchFocusVisible(false))
        .and(toHaveStyle('boxShadow', FOCUS_RING, { expected: false }))
    })
  })

  describe('when focused', () => {
    it('shows focus ring on keyboard focus', () => {
      cy.mount(
        <>
          <button>Before</button>
          <Button data-testid='button'>Button</Button>
        </>
      )

      cy.contains('Before').realClick()
      cy.realPress('Tab')

      cy.getByTestId('button')
        .should('have.focus')
        .and(toMatchFocusVisible(true))
        .and(toHaveStyle('boxShadow', FOCUS_RING))
    })

    it('does not keep a focus ring after a mouse click', () => {
      cy.mount(<Button data-testid='button'>Button</Button>)

      cy.getByTestId('button').realClick()

      cy.getByTestId('button')
        .should('have.focus')
        .and(toMatchFocusVisible(false))
        .and(toHaveStyle('boxShadow', FOCUS_RING, { expected: false }))
    })
  })

  describe('when the control of Button.Radio or Button.Checkbox is focused', () => {
    const TestButtonControls = () => (
      <>
        <button>Before</button>
        <Button.Radio data-testid='radio-label'>Radio</Button.Radio>
        <Button.Checkbox data-testid='checkbox-label'>Checkbox</Button.Checkbox>
        <button>After</button>
      </>
    )

    it('makes the control the only tab stop and rings the label', () => {
      cy.mount(<TestButtonControls />)

      cy.contains('Before').realClick()

      cy.realPress('Tab')
      cy.get('input[type="radio"]')
        .should('have.focus')
        .and(toMatchFocusVisible(true))
      cy.getByTestId('radio-label').should(toHaveStyle('boxShadow', FOCUS_RING))
      cy.realPress('Space')
      cy.get('input[type="radio"]').should('be.checked')

      cy.realPress('Tab')
      cy.get('[role="checkbox"]')
        .should('have.focus')
        .and(toMatchFocusVisible(true))
      cy.getByTestId('checkbox-label').should(
        toHaveStyle('boxShadow', FOCUS_RING)
      )
      cy.realPress('Space')
      cy.get('[role="checkbox"]').should('have.attr', 'aria-checked', 'true')

      cy.realPress('Tab')
      cy.contains('After').should('have.focus')
    })

    it('does not show focus ring on the labels after a mouse click', () => {
      cy.mount(<TestButtonControls />)

      cy.getByTestId('radio-label').realClick()
      cy.get('input[type="radio"]').should('be.checked')
      cy.getByTestId('radio-label').should(
        toHaveStyle('boxShadow', FOCUS_RING, { expected: false })
      )

      cy.getByTestId('checkbox-label').realClick()
      cy.get('[role="checkbox"]').should('have.attr', 'aria-checked', 'true')
      cy.getByTestId('checkbox-label').should(
        toHaveStyle('boxShadow', FOCUS_RING, { expected: false })
      )
    })
  })
})
