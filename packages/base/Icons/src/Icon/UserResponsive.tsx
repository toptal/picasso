import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import User16 from './User16'
import User24 from './User24'
import type { Props } from './User16'

const UserResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <User16 {...props} />,
    },
    <User24 {...props} />
  ) as JSX.Element
}

export default UserResponsive
