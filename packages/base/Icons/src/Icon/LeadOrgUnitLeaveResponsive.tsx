import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import LeadOrgUnitLeave16 from './LeadOrgUnitLeave16'
import LeadOrgUnitLeave24 from './LeadOrgUnitLeave24'
import type { Props } from './LeadOrgUnitLeave16'

const LeadOrgUnitLeaveResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <LeadOrgUnitLeave16 {...props} />,
    },
    <LeadOrgUnitLeave24 {...props} />
  ) as JSX.Element
}

export default LeadOrgUnitLeaveResponsive
