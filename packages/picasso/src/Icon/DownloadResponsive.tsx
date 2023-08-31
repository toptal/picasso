import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Download16 from './Download16'
import Download24 from './Download24'
import type { Props } from './Download16'

const DownloadResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Download16 {...props} />,
    },
    <Download24 {...props} />
  ) as JSX.Element
}

export default DownloadResponsive
