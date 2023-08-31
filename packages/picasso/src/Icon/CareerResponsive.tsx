import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Career16 from './Career16'
import Career24 from './Career24'
import type { Props } from './Career16'

const CareerResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Career16 {...props} />,
    },
    <Career24 {...props} />
  ) as JSX.Element
}

export default CareerResponsive
