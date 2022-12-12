import { useEffect } from 'react'

import { useHamburgerContext } from '../PageHamburgerContext'

/**
 * This hook is for components whose content should be rendered inside
 * hamburger menu.
 * Should be used in conjunction with PageHamburgerPortal component.
 * It sets hamburger menu to be visible in compact screens.
 */
const usePortalToHamburger = () => {
  const { setIsHamburgerVisible } = useHamburgerContext()

  useEffect(() => {
    setIsHamburgerVisible(true)
  }, [])
}

export default usePortalToHamburger
