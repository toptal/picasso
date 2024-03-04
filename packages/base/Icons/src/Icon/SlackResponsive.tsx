import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Slack16 from './Slack16'
import Slack24 from './Slack24'
import type { Props } from './Slack16'

const SlackResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Slack16 {...props} />,
    },
    <Slack24 {...props} />
  ) as JSX.Element
}

export default SlackResponsive
