/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Drag16 from './Drag16'
import Drag24 from './Drag24'
import type { Props } from './Drag16'

const DragResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Drag16 {...props} />,
    },
    <Drag24 {...props} />
  ) as JSX.Element
}

export default DragResponsive
