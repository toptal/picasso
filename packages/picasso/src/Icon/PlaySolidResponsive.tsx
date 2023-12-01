/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import PlaySolid16 from './PlaySolid16'
import PlaySolid24 from './PlaySolid24'
import type { Props } from './PlaySolid16'

const PlaySolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <PlaySolid16 {...props} />,
    },
    <PlaySolid24 {...props} />
  ) as JSX.Element
}

export default PlaySolidResponsive
