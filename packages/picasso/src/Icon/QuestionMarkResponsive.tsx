/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import QuestionMark16 from './QuestionMark16'
import QuestionMark24 from './QuestionMark24'
import type { Props } from './QuestionMark16'

const QuestionMarkResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <QuestionMark16 {...props} />,
    },
    <QuestionMark24 {...props} />
  ) as JSX.Element
}

export default QuestionMarkResponsive
