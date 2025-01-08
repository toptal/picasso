import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ProfileCard16 from './ProfileCard16'
import ProfileCard24 from './ProfileCard24'
import type { Props } from './ProfileCard16'

const ProfileCardResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ProfileCard16 {...props} />,
    },
    <ProfileCard24 {...props} />
  ) as JSX.Element
}

export default ProfileCardResponsive
