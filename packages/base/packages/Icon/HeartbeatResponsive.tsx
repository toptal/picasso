/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Heartbeat16 from './Heartbeat16'
import Heartbeat24 from './Heartbeat24'
import type { Props } from './Heartbeat16'

const HeartbeatResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Heartbeat16 {...props} />,
    },
    <Heartbeat24 {...props} />
  ) as JSX.Element
}

export default HeartbeatResponsive
