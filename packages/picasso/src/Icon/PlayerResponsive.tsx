import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Player16 from './Player16'
import Player24 from './Player24'
import type { Props } from './Player16'

const PlayerResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Player16 {...props} />,
    },
    <Player24 {...props} />
  ) as JSX.Element
}

export default PlayerResponsive
