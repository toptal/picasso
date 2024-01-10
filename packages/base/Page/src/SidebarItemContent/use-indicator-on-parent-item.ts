import { useEffect } from 'react'

import { useParentItemContext } from '../SidebarItem/ParentItemContextProvider'

type HookProps = {
  isSubMenu?: boolean
  hasBadge: boolean
  hasTag: boolean
}

const useIndicatorOnParentItem = ({
  isSubMenu,
  hasBadge,
  hasTag,
}: HookProps) => {
  const {
    handleDecoratedItemMount,
    handleDecoratedItemUnmount,
    isIndicatorVisible,
  } = useParentItemContext()

  useEffect(() => {
    if (isSubMenu && (hasBadge || hasTag)) {
      handleDecoratedItemMount()

      return handleDecoratedItemUnmount
    }
  }, [
    isSubMenu,
    hasBadge,
    hasTag,
    handleDecoratedItemMount,
    handleDecoratedItemUnmount,
  ])

  return isIndicatorVisible
}

export default useIndicatorOnParentItem
