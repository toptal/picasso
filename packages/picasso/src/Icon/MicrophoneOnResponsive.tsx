import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import MicrophoneOn16 from './MicrophoneOn16'
import MicrophoneOn24 from './MicrophoneOn24'
import type { Props } from './MicrophoneOn16'

const MicrophoneOnResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <MicrophoneOn16 {...props} />,
    },
    <MicrophoneOn24 {...props} />
  ) as JSX.Element
}

export default MicrophoneOnResponsive
