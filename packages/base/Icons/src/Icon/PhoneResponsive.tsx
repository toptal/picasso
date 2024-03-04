import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Phone16 from './Phone16'
import Phone24 from './Phone24'
import type { Props } from './Phone16'

const PhoneResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Phone16 {...props} />,
    },
    <Phone24 {...props} />
  ) as JSX.Element
}

export default PhoneResponsive
