/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Message16 from './Message16'
import Message24 from './Message24'
import type { Props } from './Message16'

const MessageResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Message16 {...props} />,
    },
    <Message24 {...props} />
  ) as JSX.Element
}

export default MessageResponsive
