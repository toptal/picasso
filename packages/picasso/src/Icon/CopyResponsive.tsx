/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Copy16 from './Copy16'
import Copy24 from './Copy24'
import type { Props } from './Copy16'

const CopyResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Copy16 {...props} />,
    },
    <Copy24 {...props} />
  ) as JSX.Element
}

export default CopyResponsive
