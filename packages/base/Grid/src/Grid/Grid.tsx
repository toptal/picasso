import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import { rem, type BaseProps } from '@toptal/picasso-shared'
import type { BreakpointKeys } from '@toptal/picasso-provider'
import { useCurrentBreakpointRange } from '@toptal/picasso-provider'

// Taken from MUI
type GridJustification =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

// Taken from MUI
type GridItemsAlignment = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'

// Taken from MUI
type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'

// Taken from MUI
export type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

import GridContext from '../GridContext/GridContext'
import { GridSpacing } from '@material-ui/core'

export interface Props extends BaseProps, HTMLAttributes<HTMLElement> {
  /** Grid content containing Grid.Item */
  children?: ReactNode
  /** Defines amount of space between Grid.Item components (in px). If spacing is not set, then it will
   * be automatically adjusted based on the screen size (16px for screens smaller than medium, 24px
   * for medium screens, and 32px for screens bigger than medium)
   */
  spacing?: 0 | 8 | 16 | 32 | 64 | 72 | 80
  /** Defines the orientation of the grid */
  direction?: GridDirection
  /** Defines the align-items style property based on the direction */
  alignItems?: GridItemsAlignment
  /** Defines the justify-content style property based on the direction */
  justifyContent?: GridJustification
  /** Defines the flex-wrap style property based on the direction */
  wrap?: GridWrap
}

/*
Overall plan
? make the spacing work, as its styles used to be constructed dynamically
- make the size work, as its styles used to be constructed dynamically


To do
- CSS is different depending on the direction
- can addUtilities help?
- it can generate responsive variants https://v1.tailwindcss.com/docs/adding-new-utilities#generating-responsive-variants

### How spacing used to work before

const humanToMUISpacing = (spacing: number) => {
  // Material Design margins and columns follow an 8px square baseline grid
  return (spacing / 8) as GridSpacing
}

Example
spacing=32
passed further to MUIGrid humanToMUISpacing(32) = 4

inside of MUIGrid (https://github.com/mui/material-ui/blob/9f09ed2eb9a35f14684d5015b645976c149ddb57/packages/mui-material/src/Grid/Grid.js#L342)

if string, then it returns `spacing-xs-${spacing}`, so "spacing-xs-4"
  - "spacing-xs-4" resolves to 

Prepared classed
  'spacing-xs-1': string;
  ...
  'spacing-xs-10': string;

spacing-xs-4 is generated for container and item

.v6ncql-MuiGrid-spacing-xs-4 {
  width: calc(100% + 32px);
  margin: -16px;
}
.v6ncql-MuiGrid-spacing-xs-4 > .v6ncql-MuiGrid-item {
  padding: 16px;
}

if object, then it returns breakpoints TBD

### How size used to work

Flex items size, "size" property (xs, sm, ...)
if xs={boolean}, then auto layout https://github.com/mui/material-ui/blob/b78eaf0d320b621b62fdd4381beda60e8c9da0fa/packages/mui-material/src/Grid/Grid.js#L51-L52
if xs={'auto'}, then the content value is used instead https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis#values
if xs={number}, then it generates style with custom flexBasis: fullWidth and maxWidth: fullWidth, https://github.com/mui/material-ui/blob/b78eaf0d320b621b62fdd4381beda60e8c9da0fa/packages/mui-material/src/Grid/Grid.js#L94-L95

Row gap and negative margin 
https://github.com/mui/material-ui/blob/b78eaf0d320b621b62fdd4381beda60e8c9da0fa/packages/mui-material/src/Grid/Grid.js#L181


*/


const responsiveSpacingConfiguration: Record<BreakpointKeys, number> = {
  xs: 16,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 32,
}

const useResponsiveSpacing = () => {
  const { currentBreakpointRange } = useCurrentBreakpointRange()

  if (currentBreakpointRange) {
    return responsiveSpacingConfiguration[currentBreakpointRange]
  }

  return responsiveSpacingConfiguration.md
}

// TODO: rework, going with ifs for now
const getJustifyContentClassName = (justifyContent: Props['justifyContent']) => {
  if (justifyContent === 'flex-start') {
    return 'justify-start'
  }

  if (justifyContent === 'center') {
    return 'justify-center'
  }

  if (justifyContent === 'flex-end') {
    return 'justify-end'
  }

  if (justifyContent === 'space-between') {
    return 'justify-between'
  }

  if (justifyContent === 'space-around') {
    return 'justify-around'
  }

  if (justifyContent === 'space-evenly') {
    return 'justify-evenly'
  }

  return ''
}

// TODO: rework, going with ifs for now
const getAlignItemsClassName = (alignItems: Props['alignItems']) => {
  if (alignItems === 'flex-start') {
    return 'items-start'
  }

  if (alignItems === 'center') {
    return 'items-center'
  }

  if (alignItems === 'flex-end') {
    return 'items-end'
  }

  if (alignItems === 'stretch') {
    return 'items-stretch'
  }

  if (alignItems === 'baseline') {
    return 'items-baseline'
  }

  return ''
}

// TODO: rework, going with ifs for now
const getDirectionClassName = (direction: Props['direction']) => {
  if (direction === 'row') {
    return 'flex-row'
  }

  if (direction === 'row-reverse') {
    return 'flex-row-reverse'
  }

  if (direction === 'column') {
    return 'flex-col'
  }

  if (direction === 'column-reverse') {
    return 'flex-col-reverse'
  }

  return ''
}

// TODO: rework, going with ifs for now
const getWrapClassName = (wrap: Props['wrap']) => {
  if (wrap === 'nowrap') {
    return 'flex-nowrap'
  }

  if (wrap === 'wrap') {
    return 'flex-wrap'
  }

  if (wrap === 'wrap-reverse') {
    return 'flex-wrap-reverse'
  }

  return ''
}

// TODO: rework, going with ifs for now
// -m-0.25 -m-0.5 -m-0.75 -m-1 -m-1.25 -m-1.5 -m-1.75 -m-2 -m-2.25 -m-2.5 -m-2.75 -m-3 -m-3.25 -m-3.5 -m-3.75 -m-4 -m-4.25 -m-4.5 -m-4.75 -m-5 -m-5.25 -m-5.5 -m-5.75 -m-6 -m-6.25 -m-6.5 -m-6.75 -m-7 -m-7.25 -m-7.5 -m-7.75 -m-8 -m-8.25 -m-8.5 -m-8.75 -m-9 -m-9.25 -m-9.5 -m-9.75 -m-10 -m-10.25 -m-10.5 -m-10.75 -m-11 -m-11.25 -m-11.5 -m-11.75 -m-12 -m-12.25 -m-12.5 -m-12.75 -m-13 -m-13.25 -m-13.5 -m-13.75 -m-14 -m-14.25 -m-14.5 -m-14.75 -m-15 -m-15.25 -m-15.5 -m-15.75 -m-16 -m-16.25 -m-16.5 -m-16.75 -m-17 -m-17.25 -m-17.5 -m-17.75 -m-18 -m-18.25 -m-18.5 -m-18.75 -m-19 -m-19.25 -m-19.5 -m-19.75 -m-20 -m-20.25 -m-20.5 -m-20.75 -m-21 -m-21.25 -m-21.5 -m-21.75 -m-22 -m-22.25 -m-22.5 -m-22.75 -m-23 -m-23.25 -m-23.5 -m-23.75 -m-24
// width-calc-100%-16px width-calc-100%-24px width-calc-100%-32px width-calc-100%-40px width-calc-100%-48px width-calc-100%-56px width-calc-100%-64px width-calc-100%-72px width-calc-100%-80px
const getGridSpacingClassName = (spacing: Props['spacing']) => {
  if (spacing === 0 || spacing === undefined) {
    return ''
  }

  return `width-calc-100%-${spacing / 2}px -m-${rem(spacing * 2).replace('rem', '')}`
}

// eslint-disable-next-line react/display-name
export const Grid = forwardRef<HTMLDivElement, Props>(function Grid(
  props,
  ref
) {
  const {
    children,
    spacing: userSpacing,
    direction,
    alignItems,
    justifyContent,
    wrap,
    className,
    style,
    ...rest
  } = props

  const responsiveSpacing = useResponsiveSpacing()
  const gridSpacing = userSpacing ?? responsiveSpacing
  //const spacingClassName = getSpacingClassName(gridSpacing)

  const justifyContentClassName = getJustifyContentClassName(justifyContent)
  const alignItemsClassName = getAlignItemsClassName(alignItems)
  const wrapClassName = getWrapClassName(wrap)
  const directionClassName = getDirectionClassName(direction)

  console.log('@@@ gridSpacing', gridSpacing, wrapClassName)

  // TODO: tmp hack
  const gridSpacingClassName = getGridSpacingClassName(gridSpacing as unknown as Props['spacing'])

  return (
    <GridContext.Provider value={{
      spacing: gridSpacing,
    }}
    >
      <div
        ref={ref}
        style={style}
        className={`flex w-full ${justifyContentClassName} ${alignItemsClassName} ${wrapClassName} ${directionClassName} ${gridSpacingClassName}`}
      >
        {children}
      </div>
    </GridContext.Provider>
  )

  // return (
  //   <MUIGrid
  //     {...rest}
  //     ref={ref}
  //     container
  //     spacing={gridSpacing}
  //     direction={direction}
  //     alignItems={alignItems}
  //     justifyContent={justifyContent}
  //     wrap={wrap}
  //     classes={classes}
  //     className={className}
  //     style={style}
  //   >
  //     {children}
  //   </MUIGrid>
  // )
})

Grid.defaultProps = {
  alignItems: 'flex-start',
  direction: 'row',
  justifyContent: 'flex-start',
  wrap: 'wrap',
}

Grid.displayName = 'Grid'

export default Grid
