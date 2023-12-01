/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import InfoSolid16 from './InfoSolid16'
import InfoSolid24 from './InfoSolid24'
import type { Props } from './InfoSolid16'

const InfoSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <InfoSolid16 {...props} />,
    },
    <InfoSolid24 {...props} />
  ) as JSX.Element
}

export default InfoSolidResponsive
