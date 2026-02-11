import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import CurrencyNote16 from './CurrencyNote16'
import CurrencyNote24 from './CurrencyNote24'
import type { Props } from './CurrencyNote16'

const CurrencyNoteResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <CurrencyNote16 {...props} />,
    },
    <CurrencyNote24 {...props} />
  ) as JSX.Element
}

export default CurrencyNoteResponsive
