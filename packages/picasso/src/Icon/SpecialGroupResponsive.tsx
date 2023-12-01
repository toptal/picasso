/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import SpecialGroup16 from './SpecialGroup16'
import SpecialGroup24 from './SpecialGroup24'
import type { Props } from './SpecialGroup16'

const SpecialGroupResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <SpecialGroup16 {...props} />,
    },
    <SpecialGroup24 {...props} />
  ) as JSX.Element
}

export default SpecialGroupResponsive
