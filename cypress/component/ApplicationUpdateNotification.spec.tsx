import React from 'react'
import { mount } from '@cypress/react'
import { Button, ApplicationUpdateNotification } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const ApplicationUpdateNotificationExample = () => {
  const { showCustom } = useNotifications()

  return (
    <Button
      data-testid='trigger'
      variant='secondary'
      onClick={() =>
        showCustom(<ApplicationUpdateNotification />, { persist: true })
      }
    >
      Show App Update Notification
    </Button>
  )
}

describe('ApplicationUpdateNotification', () => {
  it('renders notification when click on trigger', () => {
    mount(
      <TestingPicasso>
        <ApplicationUpdateNotificationExample />
      </TestingPicasso>
    )

    cy.get('[data-testid="trigger"').click()
    cy.get('body').happoScreenshot()
  })
})
