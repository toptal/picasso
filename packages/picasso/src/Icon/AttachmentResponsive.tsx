import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Attachment16 from './Attachment16'
import Attachment24 from './Attachment24'
import type { Props } from './Attachment16'

const AttachmentResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Attachment16 {...props} />,
    },
    <Attachment24 {...props} />
  ) as JSX.Element
}

export default AttachmentResponsive
