import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import LengthenParagraphText16 from './LengthenParagraphText16'
import LengthenParagraphText24 from './LengthenParagraphText24'
import type { Props } from './LengthenParagraphText16'

const LengthenParagraphTextResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <LengthenParagraphText16 {...props} />,
    },
    <LengthenParagraphText24 {...props} />
  ) as JSX.Element
}

export default LengthenParagraphTextResponsive
