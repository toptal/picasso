import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import PhoneDown16 from './PhoneDown16'
import PhoneDown24 from './PhoneDown24'
import type { Props } from './PhoneDown16'

const PhoneDownResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <PhoneDown16 {...props} />,
    },
    <PhoneDown24 {...props} />
  ) as JSX.Element
}

export default PhoneDownResponsive
