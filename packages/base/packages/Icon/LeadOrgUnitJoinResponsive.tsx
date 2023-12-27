/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import LeadOrgUnitJoin16 from './LeadOrgUnitJoin16'
import LeadOrgUnitJoin24 from './LeadOrgUnitJoin24'
import type { Props } from './LeadOrgUnitJoin16'

const LeadOrgUnitJoinResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <LeadOrgUnitJoin16 {...props} />,
    },
    <LeadOrgUnitJoin24 {...props} />
  ) as JSX.Element
}

export default LeadOrgUnitJoinResponsive
