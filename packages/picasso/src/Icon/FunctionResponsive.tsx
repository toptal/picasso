/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Function16 from './Function16'
import Function24 from './Function24'
import type { Props } from './Function16'

const FunctionResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Function16 {...props} />,
    },
    <Function24 {...props} />
  ) as JSX.Element
}

export default FunctionResponsive
