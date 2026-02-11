import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Badge16 from './Badge16'
import Badge24 from './Badge24'
import type { Props } from './Badge16'

const BadgeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Badge16 {...props} />,
    },
    <Badge24 {...props} />
  ) as JSX.Element
}

export default BadgeResponsive
