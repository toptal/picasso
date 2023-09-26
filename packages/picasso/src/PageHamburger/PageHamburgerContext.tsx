import type { ReactNode } from 'react'
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

const noop = () => {}

interface InternalHamburgerContextProps {
  hamburgerId: string
  setMenuCount: (val: (prev: number) => number) => void
  menuCount: number
  hasTopBar: boolean
  setHasTopBar: (val: boolean) => void
  hamburgerRef?: React.RefObject<HTMLDivElement>
}

export interface HamburgerContextProps {
  hamburgerId: string
  showSidebarMenu: boolean
  hasTopBar: boolean
  setHasTopBar: (val: boolean) => void
  hamburgerRef?: React.RefObject<HTMLDivElement>
}

const PageHamburgerContext = createContext<InternalHamburgerContextProps>({
  hamburgerId: 'hamburger',
  setMenuCount: noop,
  menuCount: 0,
  setHasTopBar: noop,
  hasTopBar: false,
})

interface Props {
  children: ReactNode
  hamburgerId: string
}

export const PageHamburgerContextProvider = ({
  children,
  hamburgerId,
}: Props) => {
  const [hasTopBar, setHasTopBar] = useState(true)
  const [menuCount, setMenuCount] = useState(0)

  const hamburgerRef = useRef<HTMLDivElement>(null)

  const context: InternalHamburgerContextProps = {
    hamburgerId,
    hasTopBar,
    setHasTopBar,
    hamburgerRef,
    setMenuCount,
    menuCount,
  }

  return (
    <PageHamburgerContext.Provider value={context}>
      {children}
    </PageHamburgerContext.Provider>
  )
}

export const useHamburgerContext = (): HamburgerContextProps => {
  const { hamburgerId, hasTopBar, setHasTopBar, hamburgerRef, menuCount } =
    useContext(PageHamburgerContext)

  const hasSidebar = menuCount > 0

  return {
    hamburgerId,
    hasTopBar,
    setHasTopBar,
    hamburgerRef,
    showSidebarMenu: hasSidebar && hasTopBar,
  }
}

export const useRegisterMenu = () => {
  const { setMenuCount } = useContext(PageHamburgerContext)

  useEffect(() => {
    setMenuCount(prev => prev + 1)

    return () => {
      setMenuCount(prev => prev - 1)
    }
  }, [setMenuCount])
}
