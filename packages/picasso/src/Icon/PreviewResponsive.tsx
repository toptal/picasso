/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Preview16 from './Preview16'
import Preview24 from './Preview24'
import type { Props } from './Preview16'

const PreviewResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Preview16 {...props} />,
    },
    <Preview24 {...props} />
  ) as JSX.Element
}

export default PreviewResponsive
