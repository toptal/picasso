export type VariantType = 'light' | 'dark'

export interface SidebarContextProps {
  variant?: VariantType
  expandedItemKey: number | null
  setExpandedItemKey: (expanded: number | null) => void
  isCollapsed: boolean
  isHovered: boolean
}
