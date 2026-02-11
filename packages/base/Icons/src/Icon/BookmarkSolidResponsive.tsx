import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import BookmarkSolid16 from './BookmarkSolid16'
import BookmarkSolid24 from './BookmarkSolid24'
import type { Props } from './BookmarkSolid16'

const BookmarkSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <BookmarkSolid16 {...props} />,
    },
    <BookmarkSolid24 {...props} />
  ) as JSX.Element
}

export default BookmarkSolidResponsive
