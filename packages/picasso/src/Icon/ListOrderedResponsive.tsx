/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ListOrdered16 from './ListOrdered16'
import ListOrdered24 from './ListOrdered24'
import type { Props } from './ListOrdered16'

const ListOrderedResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ListOrdered16 {...props} />,
    },
    <ListOrdered24 {...props} />
  ) as JSX.Element
}

export default ListOrderedResponsive
