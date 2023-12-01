/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Email16 from './Email16'
import Email24 from './Email24'
import type { Props } from './Email16'

const EmailResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Email16 {...props} />,
    },
    <Email24 {...props} />
  ) as JSX.Element
}

export default EmailResponsive
