// ============================
// TYPES
// ============================

// BASE-aligned spacing values in "rem" units
export type PicassoSpacingValues = 0 | 0.25 | 0.5 | 0.75 | 1 | 1.5 | 2 | 2.5 | 3

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

export type SpacingType = PicassoSpacing | DeprecatedSpacingType

export enum SpacingEnum {
  xsmall = 0.5,
  small = 1,
  medium = 1.5,
  large = 2,
  xlarge = 2.5,
}

// ============================
// CLASS DEFINITION
// ============================

export class PicassoSpacing {
  private value: PicassoSpacingValues

  private constructor(value: PicassoSpacingValues) {
    this.value = value
  }

  static create(value: PicassoSpacingValues): PicassoSpacing {
    return new PicassoSpacing(value)
  }

  valueOf(): PicassoSpacingValues {
    return this.value
  }

  toString(): string {
    return this.value.toString()
  }
}

// ============================
// SPACING CONSTANTS
// ============================

const SPACING_VALUES: PicassoSpacingValues[] = [
  0, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3,
]

const spacings = Object.freeze(
  SPACING_VALUES.reduce((acc, value, index) => {
    acc[`SPACING_${index}`] = PicassoSpacing.create(value)

    return acc
  }, {} as Record<string, PicassoSpacing>)
)

export default spacings
