import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Help16 from './Help16'
import Help24 from './Help24'
import type { Props } from './Help16'

const HelpResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Help16 {...props} />,
    },
    <Help24 {...props} />
  ) as JSX.Element
}

export default HelpResponsive
