import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Mention16 from './Mention16'
import Mention24 from './Mention24'
import type { Props } from './Mention16'

const MentionResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Mention16 {...props} />,
    },
    <Mention24 {...props} />
  ) as JSX.Element
}

export default MentionResponsive
