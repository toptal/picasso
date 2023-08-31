import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import RankOne16 from './RankOne16'
import RankOne24 from './RankOne24'
import type { Props } from './RankOne16'

const RankOneResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <RankOne16 {...props} />,
    },
    <RankOne24 {...props} />
  ) as JSX.Element
}

export default RankOneResponsive
