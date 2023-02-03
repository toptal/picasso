import React, { useCallback } from 'react'
import Portal from '@mui/material/Portal'
import { getElementById } from '@toptal/picasso-shared'

import { useHamburgerContext } from './PageHamburgerContext'

interface Props {
  children: React.ReactNode
}

const PageHamburgerPortal = ({ children }: Props) => {
  const { hamburgerId } = useHamburgerContext()

  const container = useCallback(
    () => getElementById(hamburgerId),
    [hamburgerId]
  )

  return <Portal container={container}>{children}</Portal>
}

export default PageHamburgerPortal
