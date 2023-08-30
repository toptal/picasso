// BASE-aligned spacing values in "rem" units
export type PicassoSpacingValues = 0 | 0.25 | 0.5 | 0.75 | 1 | 1.5 | 2 | 2.5 | 3

export class PicassoSpacing {
  value: number

  constructor(value: PicassoSpacingValues) {
    this.value = value
  }

  valueOf() {
    console.log('this.value: ', this.value)

    return this.value
  }

  toString() {
    return this.value.toString()
  }
}

const SPACING_0 = new PicassoSpacing(0)
const SPACING_1 = new PicassoSpacing(0.25)
const SPACING_2 = new PicassoSpacing(0.5)
const SPACING_3 = new PicassoSpacing(0.75)
const SPACING_4 = new PicassoSpacing(1)
const SPACING_5 = new PicassoSpacing(1.5)
const SPACING_6 = new PicassoSpacing(2)
const SPACING_7 = new PicassoSpacing(2.5)
const SPACING_8 = new PicassoSpacing(3)

const spacings = {
  SPACING_0,
  SPACING_1,
  SPACING_2,
  SPACING_3,
  SPACING_4,
  SPACING_5,
  SPACING_6,
  SPACING_7,
  SPACING_8,
}

export type Sizes =
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'

export enum SpacingEnum {
  xsmall = 0.5,
  small = 1,
  medium = 1.5,
  large = 2,
  xlarge = 2.5,
}

export type SizeType<T extends Sizes> = T

export type SpacingType =
  | number
  | SizeType<'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'>
  | PicassoSpacing

export default spacings
