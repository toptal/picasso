import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Time16 from './Time16'
import Time24 from './Time24'
import type { Props } from './Time16'

const TimeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Time16 {...props} />,
    },
    <Time24 {...props} />
  ) as JSX.Element
}

export default TimeResponsive
