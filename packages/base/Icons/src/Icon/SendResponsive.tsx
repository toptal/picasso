import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Send16 from './Send16'
import Send24 from './Send24'
import type { Props } from './Send16'

const SendResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Send16 {...props} />,
    },
    <Send24 {...props} />
  ) as JSX.Element
}

export default SendResponsive
