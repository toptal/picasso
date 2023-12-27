/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Abstract16 from './Abstract16'
import Abstract24 from './Abstract24'
import type { Props } from './Abstract16'

const AbstractResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Abstract16 {...props} />,
    },
    <Abstract24 {...props} />
  ) as JSX.Element
}

export default AbstractResponsive
