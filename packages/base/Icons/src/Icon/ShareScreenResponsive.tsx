import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ShareScreen16 from './ShareScreen16'
import ShareScreen24 from './ShareScreen24'
import type { Props } from './ShareScreen16'

const ShareScreenResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ShareScreen16 {...props} />,
    },
    <ShareScreen24 {...props} />
  ) as JSX.Element
}

export default ShareScreenResponsive
