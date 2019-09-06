export interface PageContextProps {
  fullWidth?: boolean
  showSidebar?: boolean
  triggerEl?: Element
  onSidebarToggle?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
