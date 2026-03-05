import type { PageContextProps } from '../Page/types'

export const getMaxWidthClass = ({ fullWidth, width }: PageContextProps) => {
  if (fullWidth || width === 'full') {
    return 'max-w-full'
  }

  if (width === 'wide') {
    return 'max-w-[var(--content-width-wide)]'
  }

  return 'max-w-[var(--content-width)]'
}
