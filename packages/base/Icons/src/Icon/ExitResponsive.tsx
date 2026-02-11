import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Exit16 from './Exit16'
import Exit24 from './Exit24'
import type { Props } from './Exit16'

const ExitResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Exit16 {...props} />,
    },
    <Exit24 {...props} />
  ) as JSX.Element
}

export default ExitResponsive
