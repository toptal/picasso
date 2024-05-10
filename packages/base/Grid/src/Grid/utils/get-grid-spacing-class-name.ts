import type { GridSpacing } from '../../types'

const gridWidthAndMarginMapping: { [K in GridSpacing]: string } = {
  0: 'w-[calc(100%-0px)] -m-[0px]',
  8: 'w-[calc(100%-8px)] -m-[4px]',
  16: 'w-[calc(100%-16px)] -m-[8px]',
  24: 'w-[calc(100%-24px)] -m-[12px]',
  32: 'w-[calc(100%-32px)] -m-[16px]',
  64: 'w-[calc(100%-64px)] -m-[32px]',
  72: 'w-[calc(100%-72px)] -m-[36px]',
  80: 'w-[calc(100%-80px)] -m-[40px]',
}

export const getGridSpacingClassName = (spacing: GridSpacing) => {
  if (!spacing || !gridWidthAndMarginMapping[spacing]) {
    return ''
  }

  // Negative margin has half of the spacing value to properly handle space on sides of grid
  return gridWidthAndMarginMapping[spacing]
}
