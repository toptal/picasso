import React from 'react'
import Portal from '@material-ui/core/Portal'
import { getElementById } from '@toptal/picasso-shared'
import { usePageTopBar } from '@toptal/picasso-provider'

import { useHamburgerContext } from './PageHamburgerContext'

interface Props {
  children: React.ReactNode
}

const PageHamburgerPortal = ({ children }: Props) => {
  const { hamburgerId } = useHamburgerContext()
  const { hasTopBar } = usePageTopBar()

  const container = getElementById(hamburgerId)

  if (!container || !hasTopBar) {
    return null
  }

  return <Portal container={container}>{children}</Portal>
}

export default PageHamburgerPortal
