import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import DesignerPencil16 from './DesignerPencil16'
import DesignerPencil24 from './DesignerPencil24'
import type { Props } from './DesignerPencil16'

const DesignerPencilResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <DesignerPencil16 {...props} />,
    },
    <DesignerPencil24 {...props} />
  ) as JSX.Element
}

export default DesignerPencilResponsive
