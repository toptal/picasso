import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Award16 from './Award16'
import Award24 from './Award24'
import type { Props } from './Award16'

const AwardResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Award16 {...props} />,
    },
    <Award24 {...props} />
  ) as JSX.Element
}

export default AwardResponsive
