import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import WorkExperience16 from './WorkExperience16'
import WorkExperience24 from './WorkExperience24'
import type { Props } from './WorkExperience16'

const WorkExperienceResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <WorkExperience16 {...props} />,
    },
    <WorkExperience24 {...props} />
  ) as JSX.Element
}

export default WorkExperienceResponsive
