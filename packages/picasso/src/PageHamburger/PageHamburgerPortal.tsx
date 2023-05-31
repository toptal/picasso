import React from 'react'
import Portal from '@material-ui/core/Portal'

import { useHamburgerContext } from './PageHamburgerContext'

interface Props {
  children: React.ReactNode
}

const PageHamburgerPortal = ({ children }: Props) => {
  const { isHamburgerVisible, hamburgerRef } = useHamburgerContext()

  if (!hamburgerRef?.current || !isHamburgerVisible) {
    return null
  }

  return <Portal container={hamburgerRef.current}>{children}</Portal>
}

export default PageHamburgerPortal
