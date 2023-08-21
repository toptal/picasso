import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Telegram16 from './Telegram16'
import Telegram24 from './Telegram24'
import type { Props } from './Telegram16'

const TelegramResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Telegram16 {...props} />,
    },
    <Telegram24 {...props} />
  ) as JSX.Element
}

export default TelegramResponsive
