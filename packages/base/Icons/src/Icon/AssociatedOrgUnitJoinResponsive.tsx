import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import AssociatedOrgUnitJoin16 from './AssociatedOrgUnitJoin16'
import AssociatedOrgUnitJoin24 from './AssociatedOrgUnitJoin24'
import type { Props } from './AssociatedOrgUnitJoin16'

const AssociatedOrgUnitJoinResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <AssociatedOrgUnitJoin16 {...props} />,
    },
    <AssociatedOrgUnitJoin24 {...props} />
  ) as JSX.Element
}

export default AssociatedOrgUnitJoinResponsive
