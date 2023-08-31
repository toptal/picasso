import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Bullet16 from './Bullet16'
import Bullet24 from './Bullet24'
import type { Props } from './Bullet16'

const BulletResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Bullet16 {...props} />,
    },
    <Bullet24 {...props} />
  ) as JSX.Element
}

export default BulletResponsive
