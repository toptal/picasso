import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Sticker16 from './Sticker16'
import Sticker24 from './Sticker24'
import type { Props } from './Sticker16'

const StickerResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Sticker16 {...props} />,
    },
    <Sticker24 {...props} />
  ) as JSX.Element
}

export default StickerResponsive
