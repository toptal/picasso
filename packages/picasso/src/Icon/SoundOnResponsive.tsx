/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import SoundOn16 from './SoundOn16'
import SoundOn24 from './SoundOn24'
import type { Props } from './SoundOn16'

const SoundOnResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <SoundOn16 {...props} />,
    },
    <SoundOn24 {...props} />
  ) as JSX.Element
}

export default SoundOnResponsive
