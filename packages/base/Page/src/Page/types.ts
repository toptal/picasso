export type ViewportWidthType = 'wide' | 'full'

export type ViewportWidth = {
  fullWidth?: boolean
  width?: ViewportWidthType
}

export type PageContextProps = ViewportWidth & {
  hasSidebar: boolean
  setHasSidebar: (value: boolean) => void
  hasTopBar: boolean
  setHasTopBar: (value: boolean) => void
}
