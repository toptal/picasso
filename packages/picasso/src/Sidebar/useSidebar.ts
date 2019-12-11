import { useContext, useMemo } from 'react'

import { SidebarContext, DEFAULT_EXPANDED_ITEM_KEY } from './Sidebar'
import { SidebarContextProps } from '../Sidebar/types'

const generateKey = (() => {
  let count = 0

  return () => String(++count)
})()

const useSidebar = () => {
  const thisItemKey = useMemo(generateKey, [])

  const { variant, expandedItemKey, setExpandedItemKey } = useContext<
    SidebarContextProps
  >(SidebarContext)

  const expand = () => {
    setExpandedItemKey(thisItemKey)
  }

  const isExpanded = expandedItemKey === thisItemKey

  const isNothingExpanded = expandedItemKey === DEFAULT_EXPANDED_ITEM_KEY

  return { variant, isExpanded, isNothingExpanded, expand }
}

export default useSidebar
