/* eslint-disable import/no-extraneous-dependencies */
export type ViewportWidthType = 'wide' | 'full'

export interface PageContextProps {
  fullWidth?: boolean
  width?: ViewportWidthType
}
