/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Certificate16 from './Certificate16'
import Certificate24 from './Certificate24'
import type { Props } from './Certificate16'

const CertificateResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Certificate16 {...props} />,
    },
    <Certificate24 {...props} />
  ) as JSX.Element
}

export default CertificateResponsive
