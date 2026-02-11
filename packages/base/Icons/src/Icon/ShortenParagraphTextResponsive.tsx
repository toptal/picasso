import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ShortenParagraphText16 from './ShortenParagraphText16'
import ShortenParagraphText24 from './ShortenParagraphText24'
import type { Props } from './ShortenParagraphText16'

const ShortenParagraphTextResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ShortenParagraphText16 {...props} />,
    },
    <ShortenParagraphText24 {...props} />
  ) as JSX.Element
}

export default ShortenParagraphTextResponsive
