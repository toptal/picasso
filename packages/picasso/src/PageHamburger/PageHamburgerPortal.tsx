import React, { useEffect, useState } from 'react'
import Portal from '@material-ui/core/Portal'
import { getElementById } from '@toptal/picasso-shared'

import { useHamburgerContext } from './PageHamburgerContext'

interface Props {
  children: React.ReactNode
}

const PageHamburgerPortal = ({ children }: Props) => {
  const { hamburgerId, isHamburgerVisible } = useHamburgerContext()
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const containerElement = getElementById(hamburgerId)

  useEffect(() => {
    if (containerElement !== container) {
      setContainer(containerElement)
    }
  }, [containerElement, container])

  if (!container || !isHamburgerVisible) {
    return null
  }

  return <Portal container={container}>{children}</Portal>
}

export default PageHamburgerPortal
