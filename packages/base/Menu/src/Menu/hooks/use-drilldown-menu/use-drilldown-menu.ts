import { useCallback, useMemo, useState } from 'react'

import type { MenuContextProps } from '../../MenuContext'

const useDrilldownMenu = () => {
  const [activeItemKey, setActiveItemKey] = useState<string>()

  const handleItemMouseEnter = useCallback((key: string) => {
    setActiveItemKey(key)
  }, [])

  const handleMenuMouseLeave = useCallback(() => {
    setActiveItemKey(undefined)
  }, [])

  const handleAwayClick = useCallback(() => {
    setActiveItemKey(undefined)
  }, [])

  const handleItemOpen = useCallback((key: string) => {
    setActiveItemKey(key)
  }, [])

  const handleItemClose = useCallback(() => {
    setActiveItemKey(undefined)
  }, [])

  const context = useMemo(
    (): MenuContextProps => ({
      variant: 'drilldown',
      activeItemKey,
      onItemMouseEnter: handleItemMouseEnter,
      onMenuMouseLeave: handleMenuMouseLeave,
      onAwayClick: handleAwayClick,
      onItemOpen: handleItemOpen,
      onItemClose: handleItemClose,
    }),
    [
      activeItemKey,
      handleItemMouseEnter,
      handleMenuMouseLeave,
      handleAwayClick,
      handleItemOpen,
      handleItemClose,
    ]
  )

  return {
    context,
    innerMenu: undefined,
    hasBackButton: false,
  }
}

export default useDrilldownMenu
