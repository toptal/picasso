/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Component16 from './Component16'
import Component24 from './Component24'
import type { Props } from './Component16'

const ComponentResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Component16 {...props} />,
    },
    <Component24 {...props} />
  ) as JSX.Element
}

export default ComponentResponsive
