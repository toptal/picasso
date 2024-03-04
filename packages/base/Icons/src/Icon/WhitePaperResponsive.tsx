import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import WhitePaper16 from './WhitePaper16'
import WhitePaper24 from './WhitePaper24'
import type { Props } from './WhitePaper16'

const WhitePaperResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <WhitePaper16 {...props} />,
    },
    <WhitePaper24 {...props} />
  ) as JSX.Element
}

export default WhitePaperResponsive
