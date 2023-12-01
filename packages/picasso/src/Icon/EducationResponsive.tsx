/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Education16 from './Education16'
import Education24 from './Education24'
import type { Props } from './Education16'

const EducationResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Education16 {...props} />,
    },
    <Education24 {...props} />
  ) as JSX.Element
}

export default EducationResponsive
