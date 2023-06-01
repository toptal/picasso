import type { ReactNode } from 'react'
import React, { createContext, useContext, useRef, useState } from 'react'

export interface HamburgerContextProps {
  hamburgerId: string
  isHamburgerVisible: boolean
  setIsHamburgerVisible: (val: boolean) => void
  hasTopBar: boolean
  setHasTopBar: (val: boolean) => void
  hamburgerRef?: React.RefObject<HTMLDivElement>
}

const PageHamburgerContext = createContext<HamburgerContextProps>({
  hamburgerId: 'hamburger',
  isHamburgerVisible: false,
  setIsHamburgerVisible: () => {},
  hasTopBar: false,
  setHasTopBar: () => {},
})

interface Props {
  children: ReactNode
  hamburgerId: string
}

export const PageHamburgerContextProvider = ({
  children,
  hamburgerId,
}: Props) => {
  const [isHamburgerVisible, setIsHamburgerVisible] = useState<boolean>(false)
  const [hasTopBar, setHasTopBar] = useState(true)
  const hamburgerRef = useRef<HTMLDivElement>(null)

  const context = {
    hamburgerId,
    isHamburgerVisible,
    setIsHamburgerVisible,
    hasTopBar,
    setHasTopBar,
    hamburgerRef,
  }

  return (
    <PageHamburgerContext.Provider value={context}>
      {children}
    </PageHamburgerContext.Provider>
  )
}

export const useHamburgerContext = () =>
  useContext<HamburgerContextProps>(PageHamburgerContext)
