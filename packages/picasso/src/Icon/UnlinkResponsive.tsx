import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Unlink16 from './Unlink16'
import Unlink24 from './Unlink24'
import type { Props } from './Unlink16'

const UnlinkResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Unlink16 {...props} />,
    },
    <Unlink24 {...props} />
  ) as JSX.Element
}

export default UnlinkResponsive
