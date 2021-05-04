import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { screen } from '@testing-library/react'
import { OmitInternalProps } from '@toptal/picasso-shared'

import ApplicationUpdateNotification, {
  Props
} from './ApplicationUpdateNotification'

const renderApplicationUpdateNotification = (
  props: OmitInternalProps<Props> = {}
) => render(<ApplicationUpdateNotification {...props} />)

describe('ApplicationUpdateNotification', () => {
  it('renders', () => {
    const { container } = renderApplicationUpdateNotification()

    expect(container).toMatchSnapshot()
  })

  it('when click on "Update Later" the corresponding callback is called', () => {
    const onCloseMock = jest.fn()
    const updateLaterButtonTestId = 'btn-update-later'

    renderApplicationUpdateNotification({
      onClose: onCloseMock,
      testIds: {
        updateLaterButton: updateLaterButtonTestId
      }
    })

    screen.getByTestId(updateLaterButtonTestId).click()
    expect(onCloseMock).toHaveBeenCalled()
  })

  it('when click on "Reload Now" the corresponding callback is called', () => {
    const onReloadClickMock = jest.fn()
    const reloadNowButtonTestId = 'btn-reload-now'

    renderApplicationUpdateNotification({
      onReloadClick: onReloadClickMock,
      testIds: {
        reloadNowButton: reloadNowButtonTestId
      }
    })

    screen.getByTestId(reloadNowButtonTestId).click()
    expect(onReloadClickMock).toHaveBeenCalled()
  })
})
