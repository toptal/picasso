import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Profile16 from './Profile16'
import Profile24 from './Profile24'
import type { Props } from './Profile16'

const ProfileResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Profile16 {...props} />,
    },
    <Profile24 {...props} />
  ) as JSX.Element
}

export default ProfileResponsive
