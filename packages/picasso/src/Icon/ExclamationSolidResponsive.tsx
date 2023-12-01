/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ExclamationSolid16 from './ExclamationSolid16'
import ExclamationSolid24 from './ExclamationSolid24'
import type { Props } from './ExclamationSolid16'

const ExclamationSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ExclamationSolid16 {...props} />,
    },
    <ExclamationSolid24 {...props} />
  ) as JSX.Element
}

export default ExclamationSolidResponsive
