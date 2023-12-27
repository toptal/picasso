/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Done16 from './Done16'
import Done24 from './Done24'
import type { Props } from './Done16'

const DoneResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Done16 {...props} />,
    },
    <Done24 {...props} />
  ) as JSX.Element
}

export default DoneResponsive
