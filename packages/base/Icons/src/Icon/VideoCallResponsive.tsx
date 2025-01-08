import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import VideoCall16 from './VideoCall16'
import VideoCall24 from './VideoCall24'
import type { Props } from './VideoCall16'

const VideoCallResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <VideoCall16 {...props} />,
    },
    <VideoCall24 {...props} />
  ) as JSX.Element
}

export default VideoCallResponsive
