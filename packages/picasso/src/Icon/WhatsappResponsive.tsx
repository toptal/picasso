/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Whatsapp16 from './Whatsapp16'
import Whatsapp24 from './Whatsapp24'
import type { Props } from './Whatsapp16'

const WhatsappResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Whatsapp16 {...props} />,
    },
    <Whatsapp24 {...props} />
  ) as JSX.Element
}

export default WhatsappResponsive
