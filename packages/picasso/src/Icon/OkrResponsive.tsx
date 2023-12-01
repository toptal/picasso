/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Okr16 from './Okr16'
import Okr24 from './Okr24'
import type { Props } from './Okr16'

const OkrResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Okr16 {...props} />,
    },
    <Okr24 {...props} />
  ) as JSX.Element
}

export default OkrResponsive
