import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'

import { useNotifications } from './use-notifications'
import Button from '../../Button'

const TestComponent = () => {
  const { showError, showInfo, showSuccess } = useNotifications()

  return (
    <>
      <Button onClick={() => showError('Error message')}>Show Error</Button>
      <Button onClick={() => showInfo('Info message')}>Show Info</Button>
      <Button onClick={() => showSuccess('Success message')}>
        Show Success
      </Button>
    </>
  )
}

const renderNotification = () => {
  return render(<TestComponent />)
}

describe('useNotifications', () => {
  it('error notification render', () => {
    const { getByText, container } = renderNotification()
    const showErrorButton = getByText('Show Error')

    fireEvent.click(showErrorButton)

    expect(container).toMatchSnapshot()
  })

  it('info notification render', () => {
    const { getByText, container } = renderNotification()
    const showInfoButton = getByText('Show Info')

    fireEvent.click(showInfoButton)

    expect(container).toMatchSnapshot()
  })

  it('success notification render', () => {
    const { getByText, container } = renderNotification()
    const showSuccessButton = getByText('Show Success')

    fireEvent.click(showSuccessButton)

    expect(container).toMatchSnapshot()
  })
})
