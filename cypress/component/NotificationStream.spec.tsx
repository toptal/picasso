import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import {
  Button,
  Container,
  Notification,
  Link,
  Pencil16,
} from '@toptal/picasso'
import { HAPPO_TARGETS } from '@toptal/picasso-test-utils'
import { PicassoBreakpoints } from '@toptal/picasso-provider/index'

const DefaultExample = () => {
  const { showInfo } = useNotifications()

  return (
    <Container padded='medium'>
      <Button
        data-testid='trigger-default'
        variant='secondary'
        onClick={() =>
          showInfo(
            "That's one small step for a man, one giant leap for mankind."
          )
        }
      >
        Trigger
      </Button>
    </Container>
  )
}

const VariantsExample = () => {
  const { showInfo, showSuccess, showError } = useNotifications()

  return (
    <Container padded='medium'>
      <Button
        data-testid='trigger-success'
        variant='secondary'
        onClick={() =>
          showSuccess(
            "That's one small step for a man, one giant leap for mankind."
          )
        }
      >
        Show success notification
      </Button>
      <Button
        data-testid='trigger-error'
        variant='secondary'
        onClick={() =>
          showError(
            "That's one small step for a man, one giant leap for mankind."
          )
        }
      >
        Show error notification
      </Button>
      <Button
        data-testid='trigger-general'
        variant='secondary'
        onClick={() =>
          showInfo(
            "That's one small step for a man, one giant leap for mankind."
          )
        }
      >
        Show general notification
      </Button>
    </Container>
  )
}

const CustomContentExample = () => {
  const { showCustom, showInfo } = useNotifications()

  const customNotification = (
    <Notification variant='white'>
      Art as the single superior counterforce against all will to negation of
      life. <br />
      Friedrich Nietzsche
      <Notification.Actions>
        <Link variant='action' href='#'>
          Do art
        </Link>
      </Notification.Actions>
    </Notification>
  )

  return (
    <Container padded='medium'>
      <Button
        data-testid='trigger-custom-content'
        variant='secondary'
        onClick={() => showCustom(customNotification, { persist: true })}
      >
        Show notification with custom content
      </Button>

      <Button
        data-testid='trigger-with-icon'
        variant='secondary'
        onClick={() => showInfo('The record was edited', <Pencil16 />)}
      >
        Show notification with custom content
      </Button>
    </Container>
  )
}

const component = 'NotificationStream'

describe('NotificationStream', () => {
  it('renders with variants', () => {
    cy.mount(<VariantsExample />)

    cy.getByTestId('trigger-success').click()
    cy.getByTestId('trigger-error').click()
    cy.getByTestId('trigger-general').click()

    cy.get('body').happoScreenshot({
      component,
      variant: 'variants',
    })
  })

  it('renders with custom content and icon', () => {
    cy.mount(<CustomContentExample />)

    cy.getByTestId('trigger-custom-content').click()
    cy.getByTestId('trigger-with-icon').click()

    cy.get('body').happoScreenshot({
      component,
      variant: 'custom-icon',
    })
  })

  Cypress._.each(HAPPO_TARGETS, happoTarget => {
    const { width } = happoTarget
    const isNarrowScreenSize = width < PicassoBreakpoints.breakpoints.values.lg

    describe(`when screen has ${width}px width`, () => {
      it(`notification uses ${
        isNarrowScreenSize ? 'compact' : 'regular'
      } layout`, () => {
        cy.viewport(width, 1000)

        cy.mount(<DefaultExample />)

        cy.getByTestId('trigger-default').click()
        cy.get('body').happoScreenshot({
          component,
          variant: `notification/${width}-default`,
          targets: [happoTarget],
        })
      })
    })
  })
})
