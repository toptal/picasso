import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Linkedin16 from './Linkedin16'
import Linkedin24 from './Linkedin24'
import type { Props } from './Linkedin16'

const LinkedinResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Linkedin16 {...props} />,
    },
    <Linkedin24 {...props} />
  ) as JSX.Element
}

export default LinkedinResponsive
