import { useSidebar } from '@toptal/picasso-provider'
import { useState } from 'react'

export interface Props {
  defaultCollapsed?: boolean
}
const useSidebarState = ({ defaultCollapsed }: Props) => {
  const useSidebarProps = useSidebar()

  const [expandedItemKey, setExpandedItemKey] = useState<number | null>(null)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    Boolean(defaultCollapsed)
  )
  const [isHovered, setIsHovered] = useState<boolean>(false)

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
