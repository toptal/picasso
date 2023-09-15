import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Gift16 from './Gift16'
import Gift24 from './Gift24'
import type { Props } from './Gift16'

const GiftResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Gift16 {...props} />,
    },
    <Gift24 {...props} />
  ) as JSX.Element
}

export default GiftResponsive
