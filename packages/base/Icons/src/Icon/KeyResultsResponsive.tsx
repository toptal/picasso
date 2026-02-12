import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import KeyResults16 from './KeyResults16'
import KeyResults24 from './KeyResults24'
import type { Props } from './KeyResults16'

const KeyResultsResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <KeyResults16 {...props} />,
    },
    <KeyResults24 {...props} />
  ) as JSX.Element
}

export default KeyResultsResponsive
