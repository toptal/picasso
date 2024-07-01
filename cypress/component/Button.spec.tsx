import React from 'react'
import { Button, Container, Link, Tooltip } from '@toptal/picasso'

const component = 'Button'

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
})
