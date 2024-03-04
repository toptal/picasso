import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import NewCandidate16 from './NewCandidate16'
import NewCandidate24 from './NewCandidate24'
import type { Props } from './NewCandidate16'

const NewCandidateResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <NewCandidate16 {...props} />,
    },
    <NewCandidate24 {...props} />
  ) as JSX.Element
}

export default NewCandidateResponsive
