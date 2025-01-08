import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Table16 from './Table16'
import Table24 from './Table24'
import type { Props } from './Table16'

const TableResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Table16 {...props} />,
    },
    <Table24 {...props} />
  ) as JSX.Element
}

export default TableResponsive
