import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Page16 from './Page16'
import Page24 from './Page24'
import type { Props } from './Page16'

const PageResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Page16 {...props} />,
    },
    <Page24 {...props} />
  ) as JSX.Element
}

export default PageResponsive
