import type { PropsWithChildren } from 'react'
import React from 'react'
import { render as baseRender, screen, fireEvent } from '@testing-library/react'
import { useNotifications } from '@toptal/picasso-notification'
import { Button } from '@material-ui/core'

import Picasso from '..'
import NotificationsProvider from './'
import type { NotificationsProviderProps } from './'

const render: typeof baseRender = ui =>
  baseRender(
    <Picasso
      loadFavicon={false}
      loadFonts={false}
      fixViewport={false}
      preventPageWidthChangeOnScrollbar={false}
      disableTransitions
    >
      {ui}
    </Picasso>
  )

const App = ({ children }: PropsWithChildren<{}>) => {
  const { showInfo } = useNotifications()
  const handleClick = () => {
    for (let index = 0; index < 6; index++) {
      showInfo('Notification')
    }
  }

  return (
    <>
      {children}
      <Button onClick={handleClick}>Open notification</Button>
    </>
  )
}

const renderNotificationsProvider = ({
  children,
  ...restProps
}: NotificationsProviderProps) => {
  return render(
    <NotificationsProvider {...restProps}>
      <App>{children}</App>
    </NotificationsProvider>
  )
}

describe('NotificationsProvider', () => {
  it('default number of max notifications', () => {
    renderNotificationsProvider({ children: 'children' })
    fireEvent.click(screen.getByRole('button'))

    const notifications = screen.getAllByText('Notification')

    expect(notifications).toHaveLength(5)
  })

  it('show custom number of max notifications', () => {
    renderNotificationsProvider({ children: 'children', maxNotifications: 2 })
    fireEvent.click(screen.getByRole('button'))

    const notifications = screen.getAllByText('Notification')

    expect(notifications).toHaveLength(2)
  })
})
