import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import EyeHide16 from './EyeHide16'
import EyeHide24 from './EyeHide24'
import type { Props } from './EyeHide16'

const EyeHideResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <EyeHide16 {...props} />,
    },
    <EyeHide24 {...props} />
  ) as JSX.Element
}

export default EyeHideResponsive
