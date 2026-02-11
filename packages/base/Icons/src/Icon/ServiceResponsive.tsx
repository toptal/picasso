import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Service16 from './Service16'
import Service24 from './Service24'
import type { Props } from './Service16'

const ServiceResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Service16 {...props} />,
    },
    <Service24 {...props} />
  ) as JSX.Element
}

export default ServiceResponsive
