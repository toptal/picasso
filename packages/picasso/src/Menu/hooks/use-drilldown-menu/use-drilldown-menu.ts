import { useCallback, useState } from 'react'

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

  return {
    activeItemKey,
    onItemMouseEnter: handleItemMouseEnter,
    onMenuMouseLeave: handleMenuMouseLeave,
    onAwayClick: handleAwayClick
  }
}

export default useDrilldownMenu
