import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import FolderMisc16 from './FolderMisc16'
import FolderMisc24 from './FolderMisc24'
import type { Props } from './FolderMisc16'

const FolderMiscResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <FolderMisc16 {...props} />,
    },
    <FolderMisc24 {...props} />
  ) as JSX.Element
}

export default FolderMiscResponsive
