import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Flash16 from './Flash16'
import Flash24 from './Flash24'
import type { Props } from './Flash16'

const FlashResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Flash16 {...props} />,
    },
    <Flash24 {...props} />
  ) as JSX.Element
}

export default FlashResponsive
