import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Project16 from './Project16'
import Project24 from './Project24'
import type { Props } from './Project16'

const ProjectResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Project16 {...props} />,
    },
    <Project24 {...props} />
  ) as JSX.Element
}

export default ProjectResponsive
