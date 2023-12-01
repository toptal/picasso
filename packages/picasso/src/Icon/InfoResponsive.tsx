/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Info16 from './Info16'
import Info24 from './Info24'
import type { Props } from './Info16'

const InfoResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Info16 {...props} />,
    },
    <Info24 {...props} />
  ) as JSX.Element
}

export default InfoResponsive
