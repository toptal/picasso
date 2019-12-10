import { useContext, useMemo } from 'react'

import { SidebarContext, DEFAULT_EXPANDED_ITEM_ID } from './Sidebar'
import { SidebarContextProps } from '../Sidebar/types'

const generateKey = (() => {
  let count = 0

  return () => String(++count)
})()

const useSidebar = () => {
  const key = useMemo(generateKey, [])

  const { variant, expanded, setExpanded } = useContext<SidebarContextProps>(
    SidebarContext
  )

  const expand = () => {
    setExpanded(key)
  }

  const isExpanded = expanded === key

  const isInitialExpandState = expanded === DEFAULT_EXPANDED_ITEM_ID

  return { variant, isExpanded, isInitialExpandState, expand }
}

export default useSidebar
