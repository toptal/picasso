import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Pencil16 from './Pencil16'
import Pencil24 from './Pencil24'
import type { Props } from './Pencil16'

const PencilResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Pencil16 {...props} />,
    },
    <Pencil24 {...props} />
  ) as JSX.Element
}

export default PencilResponsive
