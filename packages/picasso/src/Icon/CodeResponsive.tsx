import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Code16 from './Code16'
import Code24 from './Code24'
import type { Props } from './Code16'

const CodeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Code16 {...props} />,
    },
    <Code24 {...props} />
  ) as JSX.Element
}

export default CodeResponsive
