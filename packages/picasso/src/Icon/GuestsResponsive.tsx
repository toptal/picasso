/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Guests16 from './Guests16'
import Guests24 from './Guests24'
import type { Props } from './Guests16'

const GuestsResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Guests16 {...props} />,
    },
    <Guests24 {...props} />
  ) as JSX.Element
}

export default GuestsResponsive
