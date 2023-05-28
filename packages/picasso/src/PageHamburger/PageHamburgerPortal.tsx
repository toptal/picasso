import React, { useMemo } from 'react'
import Portal from '@material-ui/core/Portal'
import { getElementById } from '@toptal/picasso-shared'

import { useHamburgerContext } from './PageHamburgerContext'

interface Props {
  children: React.ReactNode
}

const PageHamburgerPortal = ({ children }: Props) => {
  const { hamburgerId } = useHamburgerContext()

  const container = useMemo(() => getElementById(hamburgerId), [hamburgerId])

  if (!container) {
    return null
  }

  return <Portal container={container}>{children}</Portal>
}

export default PageHamburgerPortal
