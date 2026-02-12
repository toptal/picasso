import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Enter16 from './Enter16'
import Enter24 from './Enter24'
import type { Props } from './Enter16'

const EnterResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Enter16 {...props} />,
    },
    <Enter24 {...props} />
  ) as JSX.Element
}

export default EnterResponsive
