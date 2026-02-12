import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import BookmarkStarEmpty16 from './BookmarkStarEmpty16'
import BookmarkStarEmpty24 from './BookmarkStarEmpty24'
import type { Props } from './BookmarkStarEmpty16'

const BookmarkStarEmptyResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <BookmarkStarEmpty16 {...props} />,
    },
    <BookmarkStarEmpty24 {...props} />
  ) as JSX.Element
}

export default BookmarkStarEmptyResponsive
