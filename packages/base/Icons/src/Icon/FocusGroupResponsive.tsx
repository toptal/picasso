import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import FocusGroup16 from './FocusGroup16'
import FocusGroup24 from './FocusGroup24'
import type { Props } from './FocusGroup16'

const FocusGroupResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <FocusGroup16 {...props} />,
    },
    <FocusGroup24 {...props} />
  ) as JSX.Element
}

export default FocusGroupResponsive
