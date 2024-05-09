import type { GridSpacing } from '../../types'

const gridWidthAndMarginMapping: { [K in GridSpacing]: string } = {
  '0': 'width-calc-100pct-0px -m-[0px]',
  '8': 'width-calc-100pct-8px -m-[4px]',
  '16': 'width-calc-100pct-16px -m-[8px]',
  '24': 'width-calc-100pct-24px -m-[12px]',
  '32': 'width-calc-100pct-32px -m-[16px]',
  '64': 'width-calc-100pct-64px -m-[32px]',
  '72': 'width-calc-100pct-72px -m-[36px]',
  '80': 'width-calc-100pct-80px -m-[40px]',
}

export const getGridSpacingClassName = (spacing: GridSpacing) => {
  if (!spacing || !gridWidthAndMarginMapping[spacing]) {
    return ''
  }

  // Negative margin has half of the spacing value to properly handle space on sides of grid
  return gridWidthAndMarginMapping[spacing]
}
