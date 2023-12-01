/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Folder16 from './Folder16'
import Folder24 from './Folder24'
import type { Props } from './Folder16'

const FolderResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Folder16 {...props} />,
    },
    <Folder24 {...props} />
  ) as JSX.Element
}

export default FolderResponsive
