/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Flag16 from './Flag16'
import Flag24 from './Flag24'
import type { Props } from './Flag16'

const FlagResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Flag16 {...props} />,
    },
    <Flag24 {...props} />
  ) as JSX.Element
}

export default FlagResponsive
