import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Recognize16 from './Recognize16'
import Recognize24 from './Recognize24'
import type { Props } from './Recognize16'

const RecognizeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Recognize16 {...props} />,
    },
    <Recognize24 {...props} />
  ) as JSX.Element
}

export default RecognizeResponsive
