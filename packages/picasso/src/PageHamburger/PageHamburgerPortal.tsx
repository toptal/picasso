import React from 'react'
import Portal from '@material-ui/core/Portal'
import { getElementById } from '@toptal/picasso-shared'

import { useHamburgerContext } from './PageHamburgerContext'

interface Props {
  children: React.ReactNode
}

const PageHamburgerPortal = ({ children }: Props) => {
  const { hamburgerId, hasTopBar } = useHamburgerContext()

  const container = getElementById(hamburgerId)

  if (!container || !hasTopBar) {
    return null
  }

  return <Portal container={container}>{children}</Portal>
}

export default PageHamburgerPortal
