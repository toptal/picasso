import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Flag216 from './Flag216'
import Flag224 from './Flag224'
import type { Props } from './Flag216'

const Flag2Responsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Flag216 {...props} />,
    },
    <Flag224 {...props} />
  ) as JSX.Element
}

export default Flag2Responsive
