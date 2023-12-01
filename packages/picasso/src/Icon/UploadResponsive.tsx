/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Upload16 from './Upload16'
import Upload24 from './Upload24'
import type { Props } from './Upload16'

const UploadResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Upload16 {...props} />,
    },
    <Upload24 {...props} />
  ) as JSX.Element
}

export default UploadResponsive
