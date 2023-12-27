/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Bold16 from './Bold16'
import Bold24 from './Bold24'
import type { Props } from './Bold16'

const BoldResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Bold16 {...props} />,
    },
    <Bold24 {...props} />
  ) as JSX.Element
}

export default BoldResponsive
