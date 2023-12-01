/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Reset16 from './Reset16'
import Reset24 from './Reset24'
import type { Props } from './Reset16'

const ResetResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Reset16 {...props} />,
    },
    <Reset24 {...props} />
  ) as JSX.Element
}

export default ResetResponsive
