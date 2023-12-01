/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Lock16 from './Lock16'
import Lock24 from './Lock24'
import type { Props } from './Lock16'

const LockResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Lock16 {...props} />,
    },
    <Lock24 {...props} />
  ) as JSX.Element
}

export default LockResponsive
