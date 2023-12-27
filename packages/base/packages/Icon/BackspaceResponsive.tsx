/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Backspace16 from './Backspace16'
import Backspace24 from './Backspace24'
import type { Props } from './Backspace16'

const BackspaceResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Backspace16 {...props} />,
    },
    <Backspace24 {...props} />
  ) as JSX.Element
}

export default BackspaceResponsive
