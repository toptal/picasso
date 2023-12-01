/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Chat16 from './Chat16'
import Chat24 from './Chat24'
import type { Props } from './Chat16'

const ChatResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Chat16 {...props} />,
    },
    <Chat24 {...props} />
  ) as JSX.Element
}

export default ChatResponsive
