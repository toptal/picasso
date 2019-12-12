export type VariantType = 'light' | 'dark'

export interface SidebarContextProps {
  variant?: VariantType
  expandedItemKey: string
  setExpandedItemKey: (expanded: string) => void
}
