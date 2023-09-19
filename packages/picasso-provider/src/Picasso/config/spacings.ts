import type { BreakpointKeys } from './breakpoints'

// BASE-aligned spacing values in "rem" units
type PicassoSpacingValues = 0 | 0.25 | 0.5 | 0.75 | 1 | 1.5 | 2 | 2.5 | 3

export type Sizes =
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'

export type SizeType<T extends Sizes> = T

/** @deprecated **/
export type DeprecatedSpacingType =
  | number
  | SizeType<'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'>

export type ResponsiveSpacingType = {
  [key in BreakpointKeys]?: PicassoSpacing
}
export type SpacingType =
  | PicassoSpacing
  | DeprecatedSpacingType
  | ResponsiveSpacingType

export enum SpacingEnum {
  xsmall = 0.5,
  small = 1,
  medium = 1.5,
  large = 2,
  xlarge = 2.5,
}

class PicassoSpacing {
  #value: PicassoSpacingValues

  private constructor(value: PicassoSpacingValues) {
    this.#value = value
  }

  static create(value: PicassoSpacingValues): PicassoSpacing {
    return new PicassoSpacing(value)
  }

  valueOf(): PicassoSpacingValues {
    return this.#value
  }

  toString(): string {
    return this.#value.toString()
  }
}

export type { PicassoSpacing }

export const isPicassoSpacing = (
  spacing: SpacingType
): spacing is PicassoSpacing => spacing instanceof PicassoSpacing

export const isResponsiveSpacing = (
  spacing: SpacingType
): spacing is ResponsiveSpacingType =>
  typeof spacing == 'object' && !isPicassoSpacing(spacing)

export const SPACING_0 = PicassoSpacing.create(0)
export const SPACING_1 = PicassoSpacing.create(0.25)
export const SPACING_2 = PicassoSpacing.create(0.5)
export const SPACING_3 = PicassoSpacing.create(0.75)
export const SPACING_4 = PicassoSpacing.create(1)
export const SPACING_6 = PicassoSpacing.create(1.5)
export const SPACING_8 = PicassoSpacing.create(2)
export const SPACING_10 = PicassoSpacing.create(2.5)
export const SPACING_12 = PicassoSpacing.create(3)

export default {
  SPACING_0,
  SPACING_1,
  SPACING_2,
  SPACING_3,
  SPACING_4,
  SPACING_6,
  SPACING_8,
  SPACING_10,
  SPACING_12,
}
