/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ListUnordered16 from './ListUnordered16'
import ListUnordered24 from './ListUnordered24'
import type { Props } from './ListUnordered16'

const ListUnorderedResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ListUnordered16 {...props} />,
    },
    <ListUnordered24 {...props} />
  ) as JSX.Element
}

export default ListUnorderedResponsive
