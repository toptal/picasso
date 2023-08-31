import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Update16 from './Update16'
import Update24 from './Update24'
import type { Props } from './Update16'

const UpdateResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Update16 {...props} />,
    },
    <Update24 {...props} />
  ) as JSX.Element
}

export default UpdateResponsive
