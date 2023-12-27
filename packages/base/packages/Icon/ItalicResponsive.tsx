/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Italic16 from './Italic16'
import Italic24 from './Italic24'
import type { Props } from './Italic16'

const ItalicResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Italic16 {...props} />,
    },
    <Italic24 {...props} />
  ) as JSX.Element
}

export default ItalicResponsive
