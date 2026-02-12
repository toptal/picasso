import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Heading16 from './Heading16'
import Heading24 from './Heading24'
import type { Props } from './Heading16'

const HeadingResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Heading16 {...props} />,
    },
    <Heading24 {...props} />
  ) as JSX.Element
}

export default HeadingResponsive
