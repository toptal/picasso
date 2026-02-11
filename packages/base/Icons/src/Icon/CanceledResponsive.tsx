import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Canceled16 from './Canceled16'
import Canceled24 from './Canceled24'
import type { Props } from './Canceled16'

const CanceledResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Canceled16 {...props} />,
    },
    <Canceled24 {...props} />
  ) as JSX.Element
}

export default CanceledResponsive
