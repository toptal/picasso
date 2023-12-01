/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Services16 from './Services16'
import Services24 from './Services24'
import type { Props } from './Services16'

const ServicesResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Services16 {...props} />,
    },
    <Services24 {...props} />
  ) as JSX.Element
}

export default ServicesResponsive
