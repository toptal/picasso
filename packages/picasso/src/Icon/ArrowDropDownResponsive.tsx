/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ArrowDropDown16 from './ArrowDropDown16'
import ArrowDropDown24 from './ArrowDropDown24'
import type { Props } from './ArrowDropDown16'

const ArrowDropDownResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ArrowDropDown16 {...props} />,
    },
    <ArrowDropDown24 {...props} />
  ) as JSX.Element
}

export default ArrowDropDownResponsive
