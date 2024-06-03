import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ProjectDiscovery16 from './ProjectDiscovery16'
import ProjectDiscovery24 from './ProjectDiscovery24'
import type { Props } from './ProjectDiscovery16'

const ProjectDiscoveryResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ProjectDiscovery16 {...props} />,
    },
    <ProjectDiscovery24 {...props} />
  ) as JSX.Element
}

export default ProjectDiscoveryResponsive
