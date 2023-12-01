/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import FullTime16 from './FullTime16'
import FullTime24 from './FullTime24'
import type { Props } from './FullTime16'

const FullTimeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <FullTime16 {...props} />,
    },
    <FullTime24 {...props} />
  ) as JSX.Element
}

export default FullTimeResponsive
