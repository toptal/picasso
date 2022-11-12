import { createContext } from 'react'

export interface PageHamburgerContextProps {
  hamburgerId: string
  showHamburger?: boolean
  setShowHamburger?: (showHamburger: boolean) => void
}

export default createContext<PageHamburgerContextProps>({
  hamburgerId: 'hamburger',
})
