/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Representatives16 from './Representatives16'
import Representatives24 from './Representatives24'
import type { Props } from './Representatives16'

const RepresentativesResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Representatives16 {...props} />,
    },
    <Representatives24 {...props} />
  ) as JSX.Element
}

export default RepresentativesResponsive
