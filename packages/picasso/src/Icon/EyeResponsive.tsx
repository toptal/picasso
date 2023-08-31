import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Eye16 from './Eye16'
import Eye24 from './Eye24'
import type { Props } from './Eye16'

const EyeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Eye16 {...props} />,
    },
    <Eye24 {...props} />
  ) as JSX.Element
}

export default EyeResponsive
