import type { ReactElement } from 'react'
import { useCallback, useMemo, useState } from 'react'

import type { MenuContextProps } from '../../../Menu/MenuContext'

const useDrilldownMenu = () => {
  const [activeItemKey, setActiveItemKey] = useState<string>()

  const handleItemMouseEnter = useCallback(
    (key: string, menu?: ReactElement) => {
      if (menu) {
        setActiveItemKey(key)
      }
    },
    []
  )

  const handleMenuMouseLeave = useCallback(() => {
    setActiveItemKey(undefined)
  }, [])

  const handleAwayClick = useCallback(() => {
    setActiveItemKey(undefined)
  }, [])

  const context = useMemo(
    (): MenuContextProps => ({
      variant: 'drilldown',
      activeItemKey,
      onItemMouseEnter: handleItemMouseEnter,
      onMenuMouseLeave: handleMenuMouseLeave,
      onAwayClick: handleAwayClick,
    }),
    [activeItemKey, handleItemMouseEnter, handleMenuMouseLeave, handleAwayClick]
  )

  return {
    context,
    innerMenu: undefined,
    hasBackButton: false,
  }
}

export default useDrilldownMenu
