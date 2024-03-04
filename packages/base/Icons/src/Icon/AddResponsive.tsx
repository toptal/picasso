import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Add16 from './Add16'
import Add24 from './Add24'
import type { Props } from './Add16'

const AddResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Add16 {...props} />,
    },
    <Add24 {...props} />
  ) as JSX.Element
}

export default AddResponsive
