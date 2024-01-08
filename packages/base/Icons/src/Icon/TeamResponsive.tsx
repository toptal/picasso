import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Team16 from './Team16'
import Team24 from './Team24'
import type { Props } from './Team16'

const TeamResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Team16 {...props} />,
    },
    <Team24 {...props} />
  ) as JSX.Element
}

export default TeamResponsive
