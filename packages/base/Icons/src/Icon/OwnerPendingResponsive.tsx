import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import OwnerPending16 from './OwnerPending16'
import OwnerPending24 from './OwnerPending24'
import type { Props } from './OwnerPending16'

const OwnerPendingResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <OwnerPending16 {...props} />,
    },
    <OwnerPending24 {...props} />
  ) as JSX.Element
}

export default OwnerPendingResponsive
