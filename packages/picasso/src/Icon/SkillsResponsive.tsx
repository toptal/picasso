/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Skills16 from './Skills16'
import Skills24 from './Skills24'
import type { Props } from './Skills16'

const SkillsResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Skills16 {...props} />,
    },
    <Skills24 {...props} />
  ) as JSX.Element
}

export default SkillsResponsive
