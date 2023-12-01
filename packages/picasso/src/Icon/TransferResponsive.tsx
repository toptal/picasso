/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Transfer16 from './Transfer16'
import Transfer24 from './Transfer24'
import type { Props } from './Transfer16'

const TransferResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Transfer16 {...props} />,
    },
    <Transfer24 {...props} />
  ) as JSX.Element
}

export default TransferResponsive
