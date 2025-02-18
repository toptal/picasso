import type { ViewportWidth } from '../Page/types'

export const getMaxWidthClass = ({ fullWidth, width }: ViewportWidth) => {
  if (fullWidth || width === 'full') {
    return 'max-w-full'
  }

  if (width === 'wide') {
    return 'max-w-[90em]'
  }

  return 'max-w-[75em]'
}
