import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import UiGuidelines16 from './UiGuidelines16'
import UiGuidelines24 from './UiGuidelines24'
import type { Props } from './UiGuidelines16'

const UiGuidelinesResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <UiGuidelines16 {...props} />,
    },
    <UiGuidelines24 {...props} />
  ) as JSX.Element
}

export default UiGuidelinesResponsive
