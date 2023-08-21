import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Skype16 from './Skype16'
import Skype24 from './Skype24'
import type { Props } from './Skype16'

const SkypeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Skype16 {...props} />,
    },
    <Skype24 {...props} />
  ) as JSX.Element
}

export default SkypeResponsive
