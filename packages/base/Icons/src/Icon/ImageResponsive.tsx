import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Image16 from './Image16'
import Image24 from './Image24'
import type { Props } from './Image16'

const ImageResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Image16 {...props} />,
    },
    <Image24 {...props} />
  ) as JSX.Element
}

export default ImageResponsive
