import { useMemo, useState } from 'react'

import { PageHamburgerContextProps } from '../PageHamburgerContext'

const useHamburger = (hamburgerId = 'hamburger') => {
  const [showHamburger, setShowHamburger] = useState<boolean>(false)

  const context = useMemo(
    (): PageHamburgerContextProps => ({
      hamburgerId,
      showHamburger,
      setShowHamburger,
    }),
    [hamburgerId, showHamburger, setShowHamburger]
  )

  return { context }
}

export default useHamburger
