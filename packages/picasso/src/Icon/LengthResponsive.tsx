import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Length16 from './Length16'
import Length24 from './Length24'
import type { Props } from './Length16'

const LengthResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Length16 {...props} />,
    },
    <Length24 {...props} />
  ) as JSX.Element
}

export default LengthResponsive
