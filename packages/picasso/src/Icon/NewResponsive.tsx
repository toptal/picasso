import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import New16 from './New16'
import New24 from './New24'
import type { Props } from './New16'

const NewResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <New16 {...props} />,
    },
    <New24 {...props} />
  ) as JSX.Element
}

export default NewResponsive
