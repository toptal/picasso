export type ViewportWidthType = 'wide' | 'full'

export interface PageContextProps {
  fullWidth?: boolean
  width?: ViewportWidthType
  showHamburger?: boolean
  setShowHamburger?: (showHamburger: boolean) => void
}
