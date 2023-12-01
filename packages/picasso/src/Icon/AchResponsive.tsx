/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Ach16 from './Ach16'
import Ach24 from './Ach24'
import type { Props } from './Ach16'

const AchResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Ach16 {...props} />,
    },
    <Ach24 {...props} />
  ) as JSX.Element
}

export default AchResponsive
