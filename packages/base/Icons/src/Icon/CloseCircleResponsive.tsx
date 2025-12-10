import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import CloseCircle16 from './CloseCircle16'
import CloseCircle24 from './CloseCircle24'
import type { Props } from './CloseCircle16'

const CloseCircleResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <CloseCircle16 {...props} />,
    },
    <CloseCircle24 {...props} />
  ) as JSX.Element
}

export default CloseCircleResponsive
