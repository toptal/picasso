import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Jobs16 from './Jobs16'
import Jobs24 from './Jobs24'
import type { Props } from './Jobs16'

const JobsResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Jobs16 {...props} />,
    },
    <Jobs24 {...props} />
  ) as JSX.Element
}

export default JobsResponsive
