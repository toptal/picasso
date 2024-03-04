import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import OwnerDefault16 from './OwnerDefault16'
import OwnerDefault24 from './OwnerDefault24'
import type { Props } from './OwnerDefault16'

const OwnerDefaultResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <OwnerDefault16 {...props} />,
    },
    <OwnerDefault24 {...props} />
  ) as JSX.Element
}

export default OwnerDefaultResponsive
