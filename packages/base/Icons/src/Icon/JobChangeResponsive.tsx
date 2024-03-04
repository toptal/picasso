import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import JobChange16 from './JobChange16'
import JobChange24 from './JobChange24'
import type { Props } from './JobChange16'

const JobChangeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <JobChange16 {...props} />,
    },
    <JobChange24 {...props} />
  ) as JSX.Element
}

export default JobChangeResponsive
