/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Language16 from './Language16'
import Language24 from './Language24'
import type { Props } from './Language16'

const LanguageResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Language16 {...props} />,
    },
    <Language24 {...props} />
  ) as JSX.Element
}

export default LanguageResponsive
