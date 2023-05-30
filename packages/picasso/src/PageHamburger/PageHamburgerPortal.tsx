import React, { useCallback } from 'react'
import Portal from '@material-ui/core/Portal'
import { getElementById } from '@toptal/picasso-shared'

import { useHamburgerContext } from './PageHamburgerContext'

interface Props {
  children: React.ReactNode
}

const PageHamburgerPortal = ({ children }: Props) => {
  const { hamburgerId, isHamburgerVisible } = useHamburgerContext()

  const container = useCallback(
    () => (isHamburgerVisible ? getElementById(hamburgerId) : null),
    [hamburgerId, isHamburgerVisible]
  )

  return <Portal container={container}>{children}</Portal>
}

export default PageHamburgerPortal
