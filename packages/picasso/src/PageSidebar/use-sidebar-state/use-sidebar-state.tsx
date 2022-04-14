import { useSidebar } from '@toptal/picasso-provider'
import { useState } from 'react'

export interface Props {
  defaultCollapsed?: boolean
}
const useSidebarState = ({ defaultCollapsed }: Props) => {
  const useSidebarProps = useSidebar()

  const [expandedItemKey, setExpandedItemKey] = useState<number | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(Boolean(defaultCollapsed))
  const [isHovered, setIsHovered] = useState(false)

  return {
    ...useSidebarProps,
    expandedItemKey,
    setExpandedItemKey,
    isCollapsed,
    setIsCollapsed,
    isHovered,
    setIsHovered
  }
}

export default useSidebarState
