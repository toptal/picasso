/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Evening16 from './Evening16'
import Evening24 from './Evening24'
import type { Props } from './Evening16'

const EveningResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Evening16 {...props} />,
    },
    <Evening24 {...props} />
  ) as JSX.Element
}

export default EveningResponsive
