/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import RankTwo16 from './RankTwo16'
import RankTwo24 from './RankTwo24'
import type { Props } from './RankTwo16'

const RankTwoResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <RankTwo16 {...props} />,
    },
    <RankTwo24 {...props} />
  ) as JSX.Element
}

export default RankTwoResponsive
