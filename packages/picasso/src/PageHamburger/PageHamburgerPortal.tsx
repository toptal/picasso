import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

import { useHamburgerContext } from './PageHamburgerContext'

interface Props {
  children: React.ReactNode
}

const PageHamburgerPortal = ({ children }: Props) => {
  const { isHamburgerVisible, hamburgerRef } = useHamburgerContext()
  const [container, setContainer] = React.useState<HTMLElement | null>(null)
  const [isMounted, setIsMounted] = React.useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)

    if (hamburgerRef?.current) {
      setContainer(hamburgerRef.current)
    }
  }, [hamburgerRef, isMounted])

  if (!container || !isHamburgerVisible) {
    return null
  }

  return createPortal(children, container)
}

export default PageHamburgerPortal
