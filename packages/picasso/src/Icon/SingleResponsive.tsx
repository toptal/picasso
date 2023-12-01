/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Single16 from './Single16'
import Single24 from './Single24'
import type { Props } from './Single16'

const SingleResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Single16 {...props} />,
    },
    <Single24 {...props} />
  ) as JSX.Element
}

export default SingleResponsive
