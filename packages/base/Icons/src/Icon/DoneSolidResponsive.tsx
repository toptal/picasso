import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import DoneSolid16 from './DoneSolid16'
import DoneSolid24 from './DoneSolid24'
import type { Props } from './DoneSolid16'

const DoneSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <DoneSolid16 {...props} />,
    },
    <DoneSolid24 {...props} />
  ) as JSX.Element
}

export default DoneSolidResponsive
