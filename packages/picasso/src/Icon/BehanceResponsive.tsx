/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Behance16 from './Behance16'
import Behance24 from './Behance24'
import type { Props } from './Behance16'

const BehanceResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Behance16 {...props} />,
    },
    <Behance24 {...props} />
  ) as JSX.Element
}

export default BehanceResponsive
