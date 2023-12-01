/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import AddDocument16 from './AddDocument16'
import AddDocument24 from './AddDocument24'
import type { Props } from './AddDocument16'

const AddDocumentResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <AddDocument16 {...props} />,
    },
    <AddDocument24 {...props} />
  ) as JSX.Element
}

export default AddDocumentResponsive
