import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ImageGallery16 from './ImageGallery16'
import ImageGallery24 from './ImageGallery24'
import type { Props } from './ImageGallery16'

const ImageGalleryResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ImageGallery16 {...props} />,
    },
    <ImageGallery24 {...props} />
  ) as JSX.Element
}

export default ImageGalleryResponsive
