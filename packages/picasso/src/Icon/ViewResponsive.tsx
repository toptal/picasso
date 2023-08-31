import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import View16 from './View16'
import View24 from './View24'
import type { Props } from './View16'

const ViewResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <View16 {...props} />,
    },
    <View24 {...props} />
  ) as JSX.Element
}

export default ViewResponsive
