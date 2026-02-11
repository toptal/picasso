import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import InProgress16 from './InProgress16'
import InProgress24 from './InProgress24'
import type { Props } from './InProgress16'

const InProgressResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <InProgress16 {...props} />,
    },
    <InProgress24 {...props} />
  ) as JSX.Element
}

export default InProgressResponsive
