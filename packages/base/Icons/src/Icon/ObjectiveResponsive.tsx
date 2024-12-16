import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Objective16 from './Objective16'
import Objective24 from './Objective24'
import type { Props } from './Objective16'

const ObjectiveResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Objective16 {...props} />,
    },
    <Objective24 {...props} />
  ) as JSX.Element
}

export default ObjectiveResponsive
