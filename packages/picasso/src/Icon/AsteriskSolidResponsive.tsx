/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import AsteriskSolid16 from './AsteriskSolid16'
import AsteriskSolid24 from './AsteriskSolid24'
import type { Props } from './AsteriskSolid16'

const AsteriskSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <AsteriskSolid16 {...props} />,
    },
    <AsteriskSolid24 {...props} />
  ) as JSX.Element
}

export default AsteriskSolidResponsive
