/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Inbox16 from './Inbox16'
import Inbox24 from './Inbox24'
import type { Props } from './Inbox16'

const InboxResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Inbox16 {...props} />,
    },
    <Inbox24 {...props} />
  ) as JSX.Element
}

export default InboxResponsive
