import type { ResponsiveSpacingType, SpacingType } from '../config/spacings'
import { SpacingEnum, isPicassoSpacing } from '../config/spacings'

const spacingToRem = (
  spacing: Exclude<SpacingType, ResponsiveSpacingType>
): string => {
  if (typeof spacing == 'number' || isPicassoSpacing(spacing)) {
    return `${spacing.valueOf()}rem`
  }

  return `${SpacingEnum[spacing]}rem`
}

export { spacingToRem }
