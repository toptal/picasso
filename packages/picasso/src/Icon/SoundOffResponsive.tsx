import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import SoundOff16 from './SoundOff16'
import SoundOff24 from './SoundOff24'
import type { Props } from './SoundOff16'

const SoundOffResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <SoundOff16 {...props} />,
    },
    <SoundOff24 {...props} />
  ) as JSX.Element
}

export default SoundOffResponsive
