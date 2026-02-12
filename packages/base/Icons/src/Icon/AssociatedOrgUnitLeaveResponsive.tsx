import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import AssociatedOrgUnitLeave16 from './AssociatedOrgUnitLeave16'
import AssociatedOrgUnitLeave24 from './AssociatedOrgUnitLeave24'
import type { Props } from './AssociatedOrgUnitLeave16'

const AssociatedOrgUnitLeaveResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <AssociatedOrgUnitLeave16 {...props} />,
    },
    <AssociatedOrgUnitLeave24 {...props} />
  ) as JSX.Element
}

export default AssociatedOrgUnitLeaveResponsive
