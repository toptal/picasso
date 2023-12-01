/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Link16 from './Link16'
import Link24 from './Link24'
import type { Props } from './Link16'

const LinkResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Link16 {...props} />,
    },
    <Link24 {...props} />
  ) as JSX.Element
}

export default LinkResponsive
