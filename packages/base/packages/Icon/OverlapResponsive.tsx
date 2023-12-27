/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Overlap16 from './Overlap16'
import Overlap24 from './Overlap24'
import type { Props } from './Overlap16'

const OverlapResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Overlap16 {...props} />,
    },
    <Overlap24 {...props} />
  ) as JSX.Element
}

export default OverlapResponsive
