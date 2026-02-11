import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import RemovedUser16 from './RemovedUser16'
import RemovedUser24 from './RemovedUser24'
import type { Props } from './RemovedUser16'

const RemovedUserResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <RemovedUser16 {...props} />,
    },
    <RemovedUser24 {...props} />
  ) as JSX.Element
}

export default RemovedUserResponsive
