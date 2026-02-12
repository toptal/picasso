import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Undo16 from './Undo16'
import Undo24 from './Undo24'
import type { Props } from './Undo16'

const UndoResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Undo16 {...props} />,
    },
    <Undo24 {...props} />
  ) as JSX.Element
}

export default UndoResponsive
