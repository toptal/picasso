import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import VideoOff16 from './VideoOff16'
import VideoOff24 from './VideoOff24'
import type { Props } from './VideoOff16'

const VideoOffResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <VideoOff16 {...props} />,
    },
    <VideoOff24 {...props} />
  ) as JSX.Element
}

export default VideoOffResponsive
