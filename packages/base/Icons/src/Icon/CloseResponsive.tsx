import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Close16 from './Close16'
import Close24 from './Close24'
import type { Props } from './Close16'

const CloseResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Close16 {...props} />,
    },
    <Close24 {...props} />
  ) as JSX.Element
}

export default CloseResponsive
