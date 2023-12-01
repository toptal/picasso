/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Company16 from './Company16'
import Company24 from './Company24'
import type { Props } from './Company16'

const CompanyResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Company16 {...props} />,
    },
    <Company24 {...props} />
  ) as JSX.Element
}

export default CompanyResponsive
