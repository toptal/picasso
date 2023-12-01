/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Dribble16 from './Dribble16'
import Dribble24 from './Dribble24'
import type { Props } from './Dribble16'

const DribbleResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Dribble16 {...props} />,
    },
    <Dribble24 {...props} />
  ) as JSX.Element
}

export default DribbleResponsive
