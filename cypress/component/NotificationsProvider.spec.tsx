import React from 'react'
import { Button } from '@toptal/picasso-button'
import { useNotifications } from '@toptal/picasso-notification'
import { NotificationsProvider } from '@toptal/picasso-provider'
import type { NotificationsProviderProps } from '@toptal/picasso-provider'

const TRIGGER_TEST_ID = 'trigger'
const NOTIFICATION_TEST_ID = 'notification-item'
const NOTIFICATIONS_TO_FIRE = 6

const Trigger = () => {
  const { showInfo } = useNotifications()

  const handleClick = () => {
    for (let index = 0; index < NOTIFICATIONS_TO_FIRE; index++) {
      showInfo(<span data-testid={NOTIFICATION_TEST_ID}>Notification</span>)
    }
  }

  return (
    <Button data-testid={TRIGGER_TEST_ID} onClick={handleClick}>
      Open notifications
    </Button>
  )
}

const Example = (props: Omit<NotificationsProviderProps, 'children'>) => (
  <NotificationsProvider {...props}>
    <Trigger />
  </NotificationsProvider>
)

describe('NotificationsProvider', () => {
  it('caps at the default maxNotifications when no prop is set', () => {
    cy.mount(<Example />)

    cy.getByTestId(TRIGGER_TEST_ID).click()

    cy.getByTestId(NOTIFICATION_TEST_ID).should('have.length', 5)
  })

  it('caps at the configured maxNotifications', () => {
    cy.mount(<Example maxNotifications={2} />)

    cy.getByTestId(TRIGGER_TEST_ID).click()

    cy.getByTestId(NOTIFICATION_TEST_ID).should('have.length', 2)
  })
})
