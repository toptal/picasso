import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Subfunction16 from './Subfunction16'
import Subfunction24 from './Subfunction24'
import type { Props } from './Subfunction16'

const SubfunctionResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Subfunction16 {...props} />,
    },
    <Subfunction24 {...props} />
  ) as JSX.Element
}

export default SubfunctionResponsive
