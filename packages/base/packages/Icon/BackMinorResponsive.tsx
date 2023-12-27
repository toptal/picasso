/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import BackMinor16 from './BackMinor16'
import BackMinor24 from './BackMinor24'
import type { Props } from './BackMinor16'

const BackMinorResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <BackMinor16 {...props} />,
    },
    <BackMinor24 {...props} />
  ) as JSX.Element
}

export default BackMinorResponsive
