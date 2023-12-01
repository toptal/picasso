/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Candidates16 from './Candidates16'
import Candidates24 from './Candidates24'
import type { Props } from './Candidates16'

const CandidatesResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Candidates16 {...props} />,
    },
    <Candidates24 {...props} />
  ) as JSX.Element
}

export default CandidatesResponsive
