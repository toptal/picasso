import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Tasks16 from './Tasks16'
import Tasks24 from './Tasks24'
import type { Props } from './Tasks16'

const TasksResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Tasks16 {...props} />,
    },
    <Tasks24 {...props} />
  ) as JSX.Element
}

export default TasksResponsive
