import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef, useContext } from 'react'
import { type BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { GridContext } from '../GridContext'
import type { GridSize, GridSpacing } from '../types'
import { getSizesClassNames } from './utils/get-sizes-class-names'

export interface GridSizes {
  /** Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority */
  xs?: boolean | GridSize
  /** Defines the number of grids the component is going to use. It's applied for the sm breakpoint and wider screens */
  sm?: boolean | GridSize
  /** Defines the number of grids the component is going to use. It's applied for the md breakpoint and wider screens */
  md?: boolean | GridSize
  /** Defines the number of grids the component is going to use. It's applied for the lg breakpoint and wider screens */
  lg?: boolean | GridSize
  /** Defines the number of grids the component is going to use. It's applied for the xl breakpoint and wider screens */
  xl?: boolean | GridSize
}

export interface Props
  extends BaseProps,
    GridSizes,
    HTMLAttributes<HTMLElement> {
  /** Content of Grid.Item */
  children?: ReactNode
}

const gridSpacingMapping: { [K in GridSpacing]: string } = {
  0: 'p-[0px]',
  8: 'p-[4px]',
  16: 'p-[8px]',
  24: 'p-[12px]',
  32: 'p-[16px]',
  64: 'p-[32px]',
  72: 'p-[36px]',
  80: 'p-[40px]',
}

const getSpacingClassName = (gridSpacing?: GridSpacing) => {
  if (!gridSpacing) {
    return ''
  }

  return gridSpacingMapping[gridSpacing]
}

export const GridItem = forwardRef<HTMLDivElement, Props>(function GridItem(
  props,
  ref
) {
  const { children, xs, sm, md, lg, xl, className, style, ...rest } = props

  const { gridSpacing } = useContext(GridContext)
  const spacingClassName = getSpacingClassName(gridSpacing)

  const sizesClassNames = getSizesClassNames({
    xs,
    sm,
    md,
    lg,
    xl,
  })

  return (
    <div
      ref={ref}
      style={style}
      {...rest}
      className={twMerge(
        'box-border',
        'm-0',
        spacingClassName,
        sizesClassNames,
        className
      )}
    >
      {children}
    </div>
  )
})

GridItem.defaultProps = {}

GridItem.displayName = 'GridItem'

export default GridItem
