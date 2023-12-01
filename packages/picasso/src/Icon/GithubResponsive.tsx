/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Github16 from './Github16'
import Github24 from './Github24'
import type { Props } from './Github16'

const GithubResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Github16 {...props} />,
    },
    <Github24 {...props} />
  ) as JSX.Element
}

export default GithubResponsive
