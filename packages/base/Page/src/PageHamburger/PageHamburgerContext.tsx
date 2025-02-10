import type { ReactNode } from 'react'
import React, { createContext, useContext, useRef, useState } from 'react'

const noop = () => {}

interface InternalHamburgerContextProps {
  hamburgerId: string
  hamburgerRef?: React.RefObject<HTMLDivElement>
  hasPageHamburger: boolean
  setHasPageHamburger: (val: boolean) => void
}

export type HamburgerContextProps = Omit<
  InternalHamburgerContextProps,
  'menuCount' | 'setMenuCount'
>

const PageHamburgerContext = createContext<InternalHamburgerContextProps>({
  hamburgerId: 'hamburger',
  setHasPageHamburger: noop,
  hasPageHamburger: false,
})

interface Props {
  children: ReactNode
  hamburgerId: string
}

export const PageHamburgerContextProvider = ({
  children,
  hamburgerId,
}: Props) => {
  const [hasPageHamburger, setHasPageHamburger] = useState(false)
  const hamburgerRef = useRef<HTMLDivElement>(null)

  const context: InternalHamburgerContextProps = {
    hamburgerId,
    hamburgerRef,
    setHasPageHamburger,
    hasPageHamburger,
  }

  return (
    <PageHamburgerContext.Provider value={context}>
      {children}
    </PageHamburgerContext.Provider>
  )
}

export const useHamburgerContext = (): HamburgerContextProps => {
  const { hamburgerId, hamburgerRef, setHasPageHamburger, hasPageHamburger } =
    useContext(PageHamburgerContext)

  return {
    hamburgerId,
    hamburgerRef,
    setHasPageHamburger,
    hasPageHamburger,
  }
}
