export type VariantType = 'light' | 'dark'

export interface SidebarContextProps {
  variant?: VariantType
  expanded: string
  setExpanded: (expanded: string) => void
}
