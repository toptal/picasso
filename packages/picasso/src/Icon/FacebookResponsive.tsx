/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Facebook16 from './Facebook16'
import Facebook24 from './Facebook24'
import type { Props } from './Facebook16'

const FacebookResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Facebook16 {...props} />,
    },
    <Facebook24 {...props} />
  ) as JSX.Element
}

export default FacebookResponsive
