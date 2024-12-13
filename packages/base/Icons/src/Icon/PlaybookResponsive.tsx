import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Playbook16 from './Playbook16'
import Playbook24 from './Playbook24'
import type { Props } from './Playbook16'

const PlaybookResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Playbook16 {...props} />,
    },
    <Playbook24 {...props} />
  ) as JSX.Element
}

export default PlaybookResponsive
