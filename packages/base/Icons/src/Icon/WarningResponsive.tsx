import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Warning16 from './Warning16'
import Warning24 from './Warning24'
import type { Props } from './Warning16'

const WarningResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Warning16 {...props} />,
    },
    <Warning24 {...props} />
  ) as JSX.Element
}

export default WarningResponsive
