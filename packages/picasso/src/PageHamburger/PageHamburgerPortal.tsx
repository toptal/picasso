import React from 'react'
import Portal from '@material-ui/core/Portal'
import { getElementById } from '@toptal/picasso-shared'

import { useHamburgerContext } from './PageHamburgerContext'

interface Props {
  children: React.ReactNode
}

const PageHamburgerPortal = ({ children }: Props) => {
  const { hamburgerId } = useHamburgerContext()

  return <Portal container={getElementById(hamburgerId)}>{children}</Portal>
}

export default PageHamburgerPortal
