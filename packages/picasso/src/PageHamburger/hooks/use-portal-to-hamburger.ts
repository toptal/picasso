import { useEffect, useMemo } from 'react'
import { getElementById } from '@toptal/picasso-shared'

import { useHamburgerContext } from '../PageHamburgerContext'

/**
 * This hook is for components whose content should be rendered inside
 * hamburger menu.
 * Should be used in conjunction with PageHamburgerPortal component.
 * It sets hamburger menu to be visible in compact screens.
 */
const usePortalToHamburger = () => {
  const { setIsHamburgerVisible, hamburgerId } = useHamburgerContext()

  const isHamburgerAvailable = useMemo(
    () => getElementById(hamburgerId),
    [hamburgerId]
  )

  useEffect(() => {
    if (isHamburgerAvailable) {
      setIsHamburgerVisible(true)
    }
  }, [setIsHamburgerVisible, isHamburgerAvailable])

  return { isHamburgerAvailable }
}

export default usePortalToHamburger
