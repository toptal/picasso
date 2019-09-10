export interface PageContextProps {
  fullWidth?: boolean
  showSidebar?: boolean
  hasSidebar?: boolean
  triggerEl?: Element
  setHasSidebar: (hasSidebar: boolean) => void
  onSidebarToggle?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
