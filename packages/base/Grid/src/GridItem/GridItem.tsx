import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef, useContext } from 'react'
import { type BaseProps } from '@toptal/picasso-shared'
import { twMerge } from 'tailwind-merge'

import { GridContext } from '../GridContext'
import type { GridSize, GridSpacing } from '../types'

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

// Tailwind needs explicit classnames to include them in the build
// .p-[4px] .p-[8px] .p-[12px] .p-[16px] .p-[32px] .p-[36px] .p-[40px]
const getSpacingClassName = (gridSpacing?: GridSpacing) => {
  if (!gridSpacing) {
    return ''
  }

  return `p-[${gridSpacing / 2}px]`
}

/*
Tailwind needs explicit classnames to include them in the build

xs:max-w-full sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-full
xs:max-w-none sm:max-w-none md:max-w-none lg:max-w-none xl:max-w-none

xs:grow sm:grow md:grow lg:grow xl:grow
xs:grow-0 sm:grow-0 md:grow-0 lg:grow-0 xl:grow-0

xs:basis-0 xs:basis-auto xs:basis-1/12 xs:basis-2/12 xs:basis-3/12 xs:basis-4/12 xs:basis-5/12 xs:basis-6/12 xs:basis-7/12 xs:basis-8/12 xs:basis-9/12 xs:basis-10/12 xs:basis-11/12 xs:basis-full
sm:basis-0 sm:basis-auto sm:basis-1/12 sm:basis-2/12 sm:basis-3/12 sm:basis-4/12 sm:basis-5/12 sm:basis-6/12 sm:basis-7/12 sm:basis-8/12 sm:basis-9/12 sm:basis-10/12 sm:basis-11/12 sm:basis-full
md:basis-0 md:basis-auto md:basis-1/12 md:basis-2/12 md:basis-3/12 md:basis-4/12 md:basis-5/12 md:basis-6/12 md:basis-7/12 md:basis-8/12 md:basis-9/12 md:basis-10/12 md:basis-11/12 md:basis-full
lg:basis-0 lg:basis-auto lg:basis-1/12 lg:basis-2/12 lg:basis-3/12 lg:basis-4/12 lg:basis-5/12 lg:basis-6/12 lg:basis-7/12 lg:basis-8/12 lg:basis-9/12 lg:basis-10/12 lg:basis-11/12 lg:basis-full
lg:basis-0 lg:basis-auto xl:basis-1/12 xl:basis-2/12 xl:basis-3/12 xl:basis-4/12 xl:basis-5/12 xl:basis-6/12 xl:basis-7/12 xl:basis-8/12 xl:basis-9/12 xl:basis-10/12 xl:basis-11/12 xl:basis-full

xs:max-w-1/12 xs:max-w-2/12 xs:max-w-3/12 xs:max-w-4/12 xs:max-w-5/12 xs:max-w-6/12 xs:max-w-7/12 xs:max-w-8/12 xs:max-w-9/12 xs:max-w-10/12 xs:max-w-11/12
sm:max-w-1/12 sm:max-w-2/12 sm:max-w-3/12 sm:max-w-4/12 sm:max-w-5/12 sm:max-w-6/12 sm:max-w-7/12 sm:max-w-8/12 sm:max-w-9/12 sm:max-w-10/12 sm:max-w-11/12
md:max-w-1/12 md:max-w-2/12 md:max-w-3/12 md:max-w-4/12 md:max-w-5/12 md:max-w-6/12 md:max-w-7/12 md:max-w-8/12 md:max-w-9/12 md:max-w-10/12 md:max-w-11/12
lg:max-w-1/12 lg:max-w-2/12 lg:max-w-3/12 lg:max-w-4/12 lg:max-w-5/12 lg:max-w-6/12 lg:max-w-7/12 lg:max-w-8/12 lg:max-w-9/12 lg:max-w-10/12 lg:max-w-11/12
xl:max-w-1/12 xl:max-w-2/12 xl:max-w-3/12 xl:max-w-4/12 xl:max-w-5/12 xl:max-w-6/12 xl:max-w-7/12 xl:max-w-8/12 xl:max-w-9/12 xl:max-w-10/12 xl:max-w-11/12
*/
const getClassNamesForBreakpoint = (
  breakpointKey: string,
  size?: GridSize | boolean
) => {
  if (size === true) {
    // DELETE_BEFORE_MERGE https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Grid/Grid.js#L28
    return [
      `${breakpointKey}:basis-0`,
      `${breakpointKey}:grow`,
      `${breakpointKey}:max-w-full`,
    ]
  } else if (size === 'auto') {
    // DELETE_BEFORE_MERGE https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Grid/Grid.js#L38
    return [
      `${breakpointKey}:basis-auto`,
      `${breakpointKey}:grow-0`,
      `${breakpointKey}:max-w-none`,
    ]
  } else if (typeof size === 'number' && !isNaN(size)) {
    // DELETE_BEFORE_MERGE https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Grid/Grid.js#L48
    const widthName = size === 12 ? 'full' : `${size}/12`

    return [
      `${breakpointKey}:basis-${widthName}`,
      `${breakpointKey}:max-w-${widthName}`,
    ]
  }

  return []
}

const getSizesClassNames = ({ xs, sm, md, lg, xl }: GridSizes) => [
  getClassNamesForBreakpoint('xs', xs),
  getClassNamesForBreakpoint('sm', sm),
  getClassNamesForBreakpoint('md', md),
  getClassNamesForBreakpoint('lg', lg),
  getClassNamesForBreakpoint('xl', xl),
]

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
    .flat()
    .join(' ')

  return (
    <div
      ref={ref}
      className={twMerge(
        // DELETE_BEFORE_MERGE https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Grid/Grid.js#L112
        'box-border',
        // DELETE_BEFORE_MERGE https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Grid/Grid.js#L113
        'm-0',
        spacingClassName,
        sizesClassNames,
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </div>
  )
})

GridItem.defaultProps = {}

GridItem.displayName = 'GridItem'

export default GridItem
