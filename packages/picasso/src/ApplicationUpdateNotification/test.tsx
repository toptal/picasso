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

    renderApplicationUpdateNotification({
      onClose: onCloseMock
    })

    screen.getByText('Update Later').click()
    expect(onCloseMock).toHaveBeenCalled()
  })

  it('when click on "Reload Now" the corresponding callback is called', () => {
    const onReloadClickonCloseMock = jest.fn()

    renderApplicationUpdateNotification({
      onReloadClick: onReloadClickonCloseMock
    })

    screen.getByText('Reload Now').click()
    expect(onReloadClickonCloseMock).toHaveBeenCalled()
  })
})
