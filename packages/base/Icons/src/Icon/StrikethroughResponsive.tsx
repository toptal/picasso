import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Strikethrough16 from './Strikethrough16'
import Strikethrough24 from './Strikethrough24'
import type { Props } from './Strikethrough16'

const StrikethroughResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Strikethrough16 {...props} />,
    },
    <Strikethrough24 {...props} />
  ) as JSX.Element
}

export default StrikethroughResponsive
