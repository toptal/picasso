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
  hasPageHamburger: boolean
  setHasPageHamburger: (val: boolean) => void
}

export type HamburgerContextProps = Omit<
  InternalHamburgerContextProps,
  'menuCount' | 'setMenuCount'
> & {
  showSidebarMenu: boolean
}

const PageHamburgerContext = createContext<InternalHamburgerContextProps>({
  hamburgerId: 'hamburger',
  setMenuCount: noop,
  menuCount: 0,
  setHasTopBar: noop,
  hasTopBar: false,
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
  const [hasTopBar, setHasTopBar] = useState(true)
  const [hasPageHamburger, setHasPageHamburger] = useState(false)
  const [menuCount, setMenuCount] = useState(0)

  const hamburgerRef = useRef<HTMLDivElement>(null)

  const context: InternalHamburgerContextProps = {
    hamburgerId,
    hasTopBar,
    setHasTopBar,
    hamburgerRef,
    setMenuCount,
    menuCount,
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
  const {
    hamburgerId,
    hasTopBar,
    setHasTopBar,
    hamburgerRef,
    menuCount,
    setHasPageHamburger,
    hasPageHamburger,
  } = useContext(PageHamburgerContext)

  const hasSidebar = menuCount > 0

  return {
    hamburgerId,
    hasTopBar,
    setHasTopBar,
    hamburgerRef,
    showSidebarMenu: hasSidebar && hasTopBar,
    setHasPageHamburger,
    hasPageHamburger,
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
