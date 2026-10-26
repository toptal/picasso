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
})
