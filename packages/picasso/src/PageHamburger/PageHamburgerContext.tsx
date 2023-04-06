import type { ReactNode } from 'react'
import React, { createContext, useContext, useState } from 'react'

export interface HamburgerContextProps {
  hamburgerId: string
  isHamburgerVisible: boolean
  setIsHamburgerVisible: (showHamburger: boolean) => void
}

const PageHamburgerContext = createContext<HamburgerContextProps>({
  hamburgerId: 'hamburger',
  isHamburgerVisible: false,
  setIsHamburgerVisible: () => {},
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

  const context = {
    hamburgerId,
    isHamburgerVisible,
    setIsHamburgerVisible,
  }

  return (
    <PageHamburgerContext.Provider value={context}>
      {children}
    </PageHamburgerContext.Provider>
  )
}

export const useHamburgerContext = () =>
  useContext<HamburgerContextProps>(PageHamburgerContext)
