import type { ResponsiveSpacingType, SpacingType } from '../config/spacings'
import { SpacingEnum, isPicassoSpacing } from '../config/spacings'

const isNumericSpacing = (
  spacing: SpacingType | undefined
): spacing is number | SpacingType => {
  const isNotNull = spacing != null
  const isNumber = typeof spacing == 'number'

  return isNotNull && (isNumber || isPicassoSpacing(spacing))
}

const spacingToRem = (
  spacing: Exclude<SpacingType, ResponsiveSpacingType>
): string => {
  if (typeof spacing == 'number' || isPicassoSpacing(spacing)) {
    return `${spacing.valueOf()}rem`
  }

  return `${SpacingEnum[spacing]}rem`
}

export { isNumericSpacing, spacingToRem }
