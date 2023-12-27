/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Archive16 from './Archive16'
import Archive24 from './Archive24'
import type { Props } from './Archive16'

const ArchiveResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Archive16 {...props} />,
    },
    <Archive24 {...props} />
  ) as JSX.Element
}

export default ArchiveResponsive
