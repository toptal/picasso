/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Instagram16 from './Instagram16'
import Instagram24 from './Instagram24'
import type { Props } from './Instagram16'

const InstagramResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Instagram16 {...props} />,
    },
    <Instagram24 {...props} />
  ) as JSX.Element
}

export default InstagramResponsive
