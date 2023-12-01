/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Share16 from './Share16'
import Share24 from './Share24'
import type { Props } from './Share16'

const ShareResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Share16 {...props} />,
    },
    <Share24 {...props} />
  ) as JSX.Element
}

export default ShareResponsive
