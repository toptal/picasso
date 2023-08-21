import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Filter16 from './Filter16'
import Filter24 from './Filter24'
import type { Props } from './Filter16'

const FilterResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Filter16 {...props} />,
    },
    <Filter24 {...props} />
  ) as JSX.Element
}

export default FilterResponsive
