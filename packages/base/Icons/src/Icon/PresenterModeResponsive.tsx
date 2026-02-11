import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import PresenterMode16 from './PresenterMode16'
import PresenterMode24 from './PresenterMode24'
import type { Props } from './PresenterMode16'

const PresenterModeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <PresenterMode16 {...props} />,
    },
    <PresenterMode24 {...props} />
  ) as JSX.Element
}

export default PresenterModeResponsive
