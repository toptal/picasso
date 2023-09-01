import type { SizeType, SpacingType } from '../config/spacings'
import { SpacingEnum, isPicassoSpacing } from '../config/spacings'

const isNumericSpacing = (
  spacing: SpacingType | undefined
): spacing is number | SpacingType => {
  const isNotNull = spacing != null
  const isNumber = typeof spacing == 'number'

  return isNotNull && (isNumber || isPicassoSpacing(spacing))
}

const spacingToRem = (spacing: SpacingType): string => {
  return isNumericSpacing(spacing)
    ? `${spacing}rem`
    : `${SpacingEnum[spacing as SizeType<any>]}rem`
}

export { isNumericSpacing, spacingToRem }
