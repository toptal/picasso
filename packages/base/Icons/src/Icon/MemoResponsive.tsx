import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Memo16 from './Memo16'
import Memo24 from './Memo24'
import type { Props } from './Memo16'

const MemoResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Memo16 {...props} />,
    },
    <Memo24 {...props} />
  ) as JSX.Element
}

export default MemoResponsive
