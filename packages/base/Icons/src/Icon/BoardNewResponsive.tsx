import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import BoardNew16 from './BoardNew16'
import BoardNew24 from './BoardNew24'
import type { Props } from './BoardNew16'

const BoardNewResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <BoardNew16 {...props} />,
    },
    <BoardNew24 {...props} />
  ) as JSX.Element
}

export default BoardNewResponsive
