/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Trash16 from './Trash16'
import Trash24 from './Trash24'
import type { Props } from './Trash16'

const TrashResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Trash16 {...props} />,
    },
    <Trash24 {...props} />
  ) as JSX.Element
}

export default TrashResponsive
