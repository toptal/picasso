import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import MicrophoneOff16 from './MicrophoneOff16'
import MicrophoneOff24 from './MicrophoneOff24'
import type { Props } from './MicrophoneOff16'

const MicrophoneOffResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <MicrophoneOff16 {...props} />,
    },
    <MicrophoneOff24 {...props} />
  ) as JSX.Element
}

export default MicrophoneOffResponsive
