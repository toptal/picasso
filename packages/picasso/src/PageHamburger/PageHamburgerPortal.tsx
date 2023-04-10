import React, { useCallback } from 'react'
import Portal from '@material-ui/core/Portal'
import { getElementById } from '@toptal/picasso-shared'

import { useHamburgerContext } from './PageHamburgerContext'

interface Props {
  children: React.ReactNode
}

const PageHamburgerPortal = ({ children }: Props) => {
  const { hamburgerId, isHamburgerVisible } = useHamburgerContext()

  const container = useCallback(() => {
    if (isHamburgerVisible) {
      return getElementById(hamburgerId)
    }

    return null
  }, [hamburgerId, isHamburgerVisible])

  return <Portal container={container}>{children}</Portal>
}

export default PageHamburgerPortal
