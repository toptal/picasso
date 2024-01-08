import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import RankThree16 from './RankThree16'
import RankThree24 from './RankThree24'
import type { Props } from './RankThree16'

const RankThreeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <RankThree16 {...props} />,
    },
    <RankThree24 {...props} />
  ) as JSX.Element
}

export default RankThreeResponsive
