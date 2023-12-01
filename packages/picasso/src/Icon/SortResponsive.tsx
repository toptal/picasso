/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Sort16 from './Sort16'
import Sort24 from './Sort24'
import type { Props } from './Sort16'

const SortResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Sort16 {...props} />,
    },
    <Sort24 {...props} />
  ) as JSX.Element
}

export default SortResponsive
