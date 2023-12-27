/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Ask16 from './Ask16'
import Ask24 from './Ask24'
import type { Props } from './Ask16'

const AskResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Ask16 {...props} />,
    },
    <Ask24 {...props} />
  ) as JSX.Element
}

export default AskResponsive
