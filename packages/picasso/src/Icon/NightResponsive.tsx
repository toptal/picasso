/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Night16 from './Night16'
import Night24 from './Night24'
import type { Props } from './Night16'

const NightResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Night16 {...props} />,
    },
    <Night24 {...props} />
  ) as JSX.Element
}

export default NightResponsive
