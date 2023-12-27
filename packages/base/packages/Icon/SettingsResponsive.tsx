/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Settings16 from './Settings16'
import Settings24 from './Settings24'
import type { Props } from './Settings16'

const SettingsResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Settings16 {...props} />,
    },
    <Settings24 {...props} />
  ) as JSX.Element
}

export default SettingsResponsive
