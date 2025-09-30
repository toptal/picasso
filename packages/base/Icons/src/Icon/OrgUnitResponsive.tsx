import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import OrgUnit16 from './OrgUnit16'
import OrgUnit24 from './OrgUnit24'
import type { Props } from './OrgUnit16'

const OrgUnitResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <OrgUnit16 {...props} />,
    },
    <OrgUnit24 {...props} />
  ) as JSX.Element
}

export default OrgUnitResponsive
