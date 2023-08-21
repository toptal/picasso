import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import EyeHidden16 from './EyeHidden16'
import EyeHidden24 from './EyeHidden24'
import type { Props } from './EyeHidden16'

const EyeHiddenResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <EyeHidden16 {...props} />,
    },
    <EyeHidden24 {...props} />
  ) as JSX.Element
}

export default EyeHiddenResponsive
