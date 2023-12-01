/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Chevron16 from './Chevron16'
import Chevron24 from './Chevron24'
import type { Props } from './Chevron16'

const ChevronResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Chevron16 {...props} />,
    },
    <Chevron24 {...props} />
  ) as JSX.Element
}

export default ChevronResponsive
