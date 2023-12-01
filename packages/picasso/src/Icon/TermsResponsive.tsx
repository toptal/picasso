/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Terms16 from './Terms16'
import Terms24 from './Terms24'
import type { Props } from './Terms16'

const TermsResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Terms16 {...props} />,
    },
    <Terms24 {...props} />
  ) as JSX.Element
}

export default TermsResponsive
