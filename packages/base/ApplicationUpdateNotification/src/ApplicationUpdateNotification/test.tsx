import React from 'react'
import { render } from '@toptal/picasso-test-utils'
import { screen } from '@testing-library/react'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import { Button } from '@toptal/picasso-button'
import { ApplicationUpdateNotificationActions } from '@toptal/picasso-application-update-notification'

import type { Props } from './ApplicationUpdateNotification'
import ApplicationUpdateNotification from './ApplicationUpdateNotification'

const renderApplicationUpdateNotification = (
  props: OmitInternalProps<Props> = {}
) => render(<ApplicationUpdateNotification {...props} />)

describe('ApplicationUpdateNotification', () => {
  it('renders', () => {
    const { container } = renderApplicationUpdateNotification()

    expect(container).toMatchSnapshot()
  })

  describe('when the onClose callback is defined', () => {
    it('calls the corresponding callback on the dismiss button', () => {
      const onCloseMock = jest.fn()
      const updateLaterButtonTestId = 'btn-dismiss'

      renderApplicationUpdateNotification({
        onClose: onCloseMock,
        dismissable: true,
        actions: () => (
          <ApplicationUpdateNotificationActions>
            <Button
              key='btn-update-now'
              variant='secondary'
              data-testid='btn-update-now'
              onClick={() => console.log('Update Now')}
            >
              Update Now
            </Button>
          </ApplicationUpdateNotificationActions>
        ),
      })

      screen.getByTestId(updateLaterButtonTestId).click()
      expect(onCloseMock).toHaveBeenCalled()
    })
  })

  describe('when click on an action', () => {
    it('calls the corresponding callback', () => {
      const onReloadClickMock = jest.fn()
      const reloadNowButtonTestId = 'btn-reload-now'

      renderApplicationUpdateNotification({
        actions: () => (
          <ApplicationUpdateNotificationActions>
            <Button
              key='btn-update-now'
              variant='secondary'
              data-testid='btn-reload-now'
              onClick={onReloadClickMock}
            >
              Update Now
            </Button>
            ,
          </ApplicationUpdateNotificationActions>
        ),
      })

      screen.getByTestId(reloadNowButtonTestId).click()
      expect(onReloadClickMock).toHaveBeenCalled()
    })
  })

  describe('when click on a close modal action', () => {
    it('calls the corresponding callback', () => {
      const onCloseMock = jest.fn()
      const updateLaterButton = 'btn-update-later'

      renderApplicationUpdateNotification({
        onClose: onCloseMock,
        dismissable: true,
        actions: onClose => (
          <ApplicationUpdateNotificationActions>
            <Button
              key='btn-update-later'
              variant='secondary'
              data-testid={updateLaterButton}
              onClick={onClose}
            >
              Update Later
            </Button>
            ,
          </ApplicationUpdateNotificationActions>
        ),
      })

      screen.getByTestId(updateLaterButton).click()
      expect(onCloseMock).toHaveBeenCalled()
    })
  })
})
