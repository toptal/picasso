import type { SizeType, SpacingType } from '../config/spacings'
import { SpacingEnum, PicassoSpacing } from '../config/spacings'

const isNumericSpacing = (spacing?: SpacingType): spacing is number => {
  if (!spacing) {
    return false
  }

  return typeof spacing === 'number' || spacing instanceof PicassoSpacing
}

const spacingToRem = (spacing: SpacingType): string => {
  return isNumericSpacing(spacing)
    ? `${spacing}rem`
    : `${SpacingEnum[spacing as SizeType<any>]}rem`
}

export { isNumericSpacing, spacingToRem }
