import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef, useContext } from 'react'
import type { GridSize } from '@material-ui/core'
import { rem, type BaseProps } from '@toptal/picasso-shared'
import { twMerge } from 'tailwind-merge'

import GridContext from '../GridContext/GridContext'
import type { GridSpacing } from '../types'

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

// TODO: figure out how to use dynamic padding that can be anything
// TODO: different styles depending on the direction and so on
// p-0.25 p-0.5 p-0.75 p-1 p-1.25 p-1.5 p-1.75 p-2 p-2.25 p-2.5 p-2.75 p-3 p-3.25 p-3.5 p-3.75 p-4 p-4.25 p-4.5 p-4.75 p-5 p-5.25 p-5.5 p-5.75 p-6 p-6.25 p-6.5 p-6.75 p-7 p-7.25 p-7.5 p-7.75 p-8 p-8.25 p-8.5 p-8.75 p-9 p-9.25 p-9.5 p-9.75 p-10 p-10.25 p-10.5 p-10.75 p-11 p-11.25 p-11.5 p-11.75 p-12 p-12.25 p-12.5 p-12.75 p-13 p-13.25 p-13.5 p-13.75 p-14 p-14.25 p-14.5 p-14.75 p-15 p-15.25 p-15.5 p-15.75 p-16 p-16.25 p-16.5 p-16.75 p-17 p-17.25 p-17.5 p-17.75 p-18 p-18.25 p-18.5 p-18.75 p-19 p-19.25 p-19.5 p-19.75 p-20 p-20.25 p-20.5 p-20.75 p-21 p-21.25 p-21.5 p-21.75 p-22 p-22.25 p-22.5 p-22.75 p-23 p-23.25 p-23.5 p-23.75 p-24
const getSpacingClassName = (spacing: GridSpacing) => {
  // TODO: recheck, if it is so simple as it looks like
  console.log('@@@ spacing', spacing)
  if (spacing === 0) {
    return ''
  }

  // TODO: recheck, px / rem problem
  return `p-${rem(spacing * 2).replace('rem', '')}`
}

// TODO: nasty hack
// basis-1/12 basis-2/12 basis-3/12 basis-4/12 basis-5/12 basis-6/12 basis-7/12 basis-8/12 basis-9/12 basis-10/12 basis-11/12 basis-full
// sm:basis-1/12 sm:basis-2/12 sm:basis-3/12 sm:basis-4/12 sm:basis-5/12 sm:basis-6/12 sm:basis-7/12 sm:basis-8/12 sm:basis-9/12 sm:basis-10/12 sm:basis-11/12 sm:basis-full
// md:basis-1/12 md:basis-2/12 md:basis-3/12 md:basis-4/12 md:basis-5/12 md:basis-6/12 md:basis-7/12 md:basis-8/12 md:basis-9/12 md:basis-10/12 md:basis-11/12 md:basis-full
// lg:basis-1/12 lg:basis-2/12 lg:basis-3/12 lg:basis-4/12 lg:basis-5/12 lg:basis-6/12 lg:basis-7/12 lg:basis-8/12 lg:basis-9/12 lg:basis-10/12 lg:basis-11/12 lg:basis-full
// xl:basis-1/12 xl:basis-2/12 xl:basis-3/12 xl:basis-4/12 xl:basis-5/12 xl:basis-6/12 xl:basis-7/12 xl:basis-8/12 xl:basis-9/12 xl:basis-10/12 xl:basis-11/12 xl:basis-full

// max-w-1/12 max-w-2/12 max-w-3/12 max-w-4/12 max-w-5/12 max-w-6/12 max-w-7/12 max-w-8/12 max-w-9/12 max-w-10/12 max-w-11/12 max-w-full
// sm:max-w-1/12 sm:max-w-2/12 sm:max-w-3/12 sm:max-w-4/12 sm:max-w-5/12 sm:max-w-6/12 sm:max-w-7/12 sm:max-w-8/12 sm:max-w-9/12 sm:max-w-10/12 sm:max-w-11/12 sm:max-w-full
// md:max-w-1/12 md:max-w-2/12 md:max-w-3/12 md:max-w-4/12 md:max-w-5/12 md:max-w-6/12 md:max-w-7/12 md:max-w-8/12 md:max-w-9/12 md:max-w-10/12 md:max-w-11/12 md:max-w-full
// lg:max-w-1/12 lg:max-w-2/12 lg:max-w-3/12 lg:max-w-4/12 lg:max-w-5/12 lg:max-w-6/12 lg:max-w-7/12 lg:max-w-8/12 lg:max-w-9/12 lg:max-w-10/12 lg:max-w-11/12 lg:max-w-full
// xl:max-w-1/12 xl:max-w-2/12 xl:max-w-3/12 xl:max-w-4/12 xl:max-w-5/12 xl:max-w-6/12 xl:max-w-7/12 xl:max-w-8/12 xl:max-w-9/12 xl:max-w-10/12 xl:max-w-11/12 xl:max-w-full

const generateClassesForNonXsBreakpoints = (
  breakpointKey: string,
  breakpointValue?: GridSize | boolean
) => {
  if (breakpointValue === true) {
    throw new Error('TODO')
    // For the auto layout
    // styles = {
    //   flexBasis: 0,
    //   flexGrow: 1,
    //   maxWidth: '100%',
    // };
  } else if (breakpointValue === 'auto') {
    throw new Error('TODO')
  } else if (breakpointValue === undefined) {
    return []
  }

  console.log('@@@ breakpointValue', breakpointValue, typeof breakpointValue)

  const breakpointValueClassName =
    breakpointValue === 12 ? 'full' : `${breakpointValue}/12`

  return [
    `${breakpointKey}:basis-${breakpointValueClassName} ${breakpointKey}:max-w-${breakpointValueClassName}`,
  ]
}

// TODO: rework, going with ifs for now
// TODO: different styles depending on the direction and so on
// Generates styling for one particular item based on the current breakpoint and the number of columns it should take
const getBreakpointAndColumnClassName = ({ xs, sm, md, lg, xl }: GridSizes) => {
  // TODO: consider boolean and 'auto' values
  let classNames = ['grow-0']

  if (xs) {
    if (xs === true) {
      throw new Error('TODO')
      // For the auto layouting
      // styles = {
      //   flexBasis: 0,
      //   flexGrow: 1,
      //   maxWidth: '100%',
      // };
    } else if (xs === 'auto') {
      throw new Error('TODO')
    }

    const xsClassName = xs === 12 ? 'full' : `${xs}/12`

    // Assuming that xs is a number from now on
    classNames.push(`basis-${xsClassName} max-w-${xsClassName}`)
  }

  const smClasses = generateClassesForNonXsBreakpoints('sm', sm)
  const mdClasses = generateClassesForNonXsBreakpoints('md', md)
  const lgClasses = generateClassesForNonXsBreakpoints('lg', lg)
  const xlClasses = generateClassesForNonXsBreakpoints('xl', xl)

  classNames = classNames.concat(smClasses, mdClasses, lgClasses, xlClasses)

  return classNames
}

export const GridItem = forwardRef<HTMLDivElement, Props>(function GridItem(
  props,
  ref
) {
  const { children, xs, sm, md, lg, xl, className, style, ...rest } = props

  const { spacing } = useContext(GridContext)
  const spacingClassName = getSpacingClassName(spacing as GridSpacing)

  const breakpointAndColumnClassName = getBreakpointAndColumnClassName({
    xs,
    sm,
    md,
    lg,
    xl,
  }).join(' ')

  return (
    <div
      ref={ref}
      className={twMerge(
        spacingClassName,
        breakpointAndColumnClassName,
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </div>
  )

  // return (<MUIGrid item ...>{children}</MUIGrid>)
})

GridItem.defaultProps = {}

GridItem.displayName = 'GridItem'

export default GridItem
