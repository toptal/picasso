/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Search16 from './Search16'
import Search24 from './Search24'
import type { Props } from './Search16'

const SearchResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Search16 {...props} />,
    },
    <Search24 {...props} />
  ) as JSX.Element
}

export default SearchResponsive
