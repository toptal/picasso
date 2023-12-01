/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Twitter16 from './Twitter16'
import Twitter24 from './Twitter24'
import type { Props } from './Twitter16'

const TwitterResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Twitter16 {...props} />,
    },
    <Twitter24 {...props} />
  ) as JSX.Element
}

export default TwitterResponsive
