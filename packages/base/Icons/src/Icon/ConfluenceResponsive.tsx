import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Confluence16 from './Confluence16'
import Confluence24 from './Confluence24'
import type { Props } from './Confluence16'

const ConfluenceResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Confluence16 {...props} />,
    },
    <Confluence24 {...props} />
  ) as JSX.Element
}

export default ConfluenceResponsive
