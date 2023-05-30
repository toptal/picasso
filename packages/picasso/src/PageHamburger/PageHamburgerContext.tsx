import type { ReactNode } from 'react'
import React, { createContext, useContext, useState } from 'react'

export interface HamburgerContextProps {
  hamburgerId: string
  isHamburgerVisible: boolean
  setIsHamburgerVisible: React.Dispatch<React.SetStateAction<boolean>>
  hasTopBar: boolean
  setHasTopBar: React.Dispatch<React.SetStateAction<boolean>>
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

  const context = {
    hamburgerId,
    isHamburgerVisible,
    setIsHamburgerVisible,
    hasTopBar,
    setHasTopBar,
  }

  return (
    <PageHamburgerContext.Provider value={context}>
      {children}
    </PageHamburgerContext.Provider>
  )
}

export const useHamburgerContext = () =>
  useContext<HamburgerContextProps>(PageHamburgerContext)
