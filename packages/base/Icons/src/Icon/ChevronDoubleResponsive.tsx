import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ChevronDouble16 from './ChevronDouble16'
import ChevronDouble24 from './ChevronDouble24'
import type { Props } from './ChevronDouble16'

const ChevronDoubleResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ChevronDouble16 {...props} />,
    },
    <ChevronDouble24 {...props} />
  ) as JSX.Element
}

export default ChevronDoubleResponsive
