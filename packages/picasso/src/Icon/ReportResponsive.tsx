/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Report16 from './Report16'
import Report24 from './Report24'
import type { Props } from './Report16'

const ReportResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Report16 {...props} />,
    },
    <Report24 {...props} />
  ) as JSX.Element
}

export default ReportResponsive
