/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ProfileCrossed16 from './ProfileCrossed16'
import ProfileCrossed24 from './ProfileCrossed24'
import type { Props } from './ProfileCrossed16'

const ProfileCrossedResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ProfileCrossed16 {...props} />,
    },
    <ProfileCrossed24 {...props} />
  ) as JSX.Element
}

export default ProfileCrossedResponsive
