import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Bookmark16 from './Bookmark16'
import Bookmark24 from './Bookmark24'
import type { Props } from './Bookmark16'

const BookmarkResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Bookmark16 {...props} />,
    },
    <Bookmark24 {...props} />
  ) as JSX.Element
}

export default BookmarkResponsive
