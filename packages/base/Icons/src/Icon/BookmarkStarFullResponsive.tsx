import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import BookmarkStarFull16 from './BookmarkStarFull16'
import BookmarkStarFull24 from './BookmarkStarFull24'
import type { Props } from './BookmarkStarFull16'

const BookmarkStarFullResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <BookmarkStarFull16 {...props} />,
    },
    <BookmarkStarFull24 {...props} />
  ) as JSX.Element
}

export default BookmarkStarFullResponsive
