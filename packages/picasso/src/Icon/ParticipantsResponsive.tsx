import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Participants16 from './Participants16'
import Participants24 from './Participants24'
import type { Props } from './Participants16'

const ParticipantsResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Participants16 {...props} />,
    },
    <Participants24 {...props} />
  ) as JSX.Element
}

export default ParticipantsResponsive
