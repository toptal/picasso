import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import UploadDocument16 from './UploadDocument16'
import UploadDocument24 from './UploadDocument24'
import type { Props } from './UploadDocument16'

const UploadDocumentResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <UploadDocument16 {...props} />,
    },
    <UploadDocument24 {...props} />
  ) as JSX.Element
}

export default UploadDocumentResponsive
