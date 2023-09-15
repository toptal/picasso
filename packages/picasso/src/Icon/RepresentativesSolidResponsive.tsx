import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import RepresentativesSolid16 from './RepresentativesSolid16'
import RepresentativesSolid24 from './RepresentativesSolid24'
import type { Props } from './RepresentativesSolid16'

const RepresentativesSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <RepresentativesSolid16 {...props} />,
    },
    <RepresentativesSolid24 {...props} />
  ) as JSX.Element
}

export default RepresentativesSolidResponsive
