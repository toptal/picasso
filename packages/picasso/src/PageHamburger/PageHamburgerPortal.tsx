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

  useEffect(() => {
    const handleSetContainer = () => setContainer(getElementById(hamburgerId))

    handleSetContainer()

    // If the container doesn't exist on the first render, try again once the whole page has loaded
    if (!container) {
      window.addEventListener('load', handleSetContainer)
    }

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('load', handleSetContainer)
    }
  }, [container, hamburgerId])

  if (!container || !isHamburgerVisible) {
    return null
  }

  return <Portal container={container}>{children}</Portal>
}

export default PageHamburgerPortal
