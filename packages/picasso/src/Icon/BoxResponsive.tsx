/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Box16 from './Box16'
import Box24 from './Box24'
import type { Props } from './Box16'

const BoxResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Box16 {...props} />,
    },
    <Box24 {...props} />
  ) as JSX.Element
}

export default BoxResponsive
