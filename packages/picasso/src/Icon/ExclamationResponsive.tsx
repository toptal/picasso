import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Exclamation16 from './Exclamation16'
import Exclamation24 from './Exclamation24'
import type { Props } from './Exclamation16'

const ExclamationResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Exclamation16 {...props} />,
    },
    <Exclamation24 {...props} />
  ) as JSX.Element
}

export default ExclamationResponsive
