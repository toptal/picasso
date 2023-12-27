/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Star16 from './Star16'
import Star24 from './Star24'
import type { Props } from './Star16'

const StarResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Star16 {...props} />,
    },
    <Star24 {...props} />
  ) as JSX.Element
}

export default StarResponsive
