/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Home16 from './Home16'
import Home24 from './Home24'
import type { Props } from './Home16'

const HomeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Home16 {...props} />,
    },
    <Home24 {...props} />
  ) as JSX.Element
}

export default HomeResponsive
