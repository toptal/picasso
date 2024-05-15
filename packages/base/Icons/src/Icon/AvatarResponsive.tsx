import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Avatar16 from './Avatar16'
import Avatar24 from './Avatar24'
import type { Props } from './Avatar16'

const AvatarResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Avatar16 {...props} />,
    },
    <Avatar24 {...props} />
  ) as JSX.Element
}

export default AvatarResponsive
