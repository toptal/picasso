import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { type BaseProps } from '@toptal/picasso-shared'
import type { BreakpointKeys } from '@toptal/picasso-provider'
import { useCurrentBreakpointRange } from '@toptal/picasso-provider'

import { GridContext } from '../GridContext'
import type {
  GridDirection,
  GridItemsAlignment,
  GridJustification,
  GridSpacing,
  GridWrap,
} from '../types'
export interface Props extends BaseProps, HTMLAttributes<HTMLElement> {
  /** Grid content containing Grid.Item */
  children?: ReactNode
  /** Defines amount of space between Grid.Item components (in px). If spacing is not set, then it will
   * be automatically adjusted based on the screen size (16px for screens smaller than medium, 24px
   * for medium screens, and 32px for screens bigger than medium)
   */
  spacing?: GridSpacing
  /** Defines the orientation of the grid */
  direction?: GridDirection
  /** Defines the align-items style property based on the direction */
  alignItems?: GridItemsAlignment
  /** Defines the justify-content style property based on the direction */
  justifyContent?: GridJustification
  /** Defines the flex-wrap style property based on the direction */
  wrap?: GridWrap
}

const responsiveSpacingConfiguration: Record<BreakpointKeys, GridSpacing> = {
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

const directionClassNamesMapping: { [K in GridDirection]: string } = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  column: 'flex-col',
  'column-reverse': 'flex-col-reverse',
}

const wrapClassNamesMapping: { [K in GridWrap]: string } = {
  wrap: 'flex-wrap',
  nowrap: 'flex-nowrap',
  'wrap-reverse': 'flex-wrap-reverse',
}

const alignItemsClassNamesMapping: { [K in GridItemsAlignment]: string } = {
  'flex-start': 'items-start',
  center: 'items-center',
  'flex-end': 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
}

const justifyContentClassNamesMapping: { [K in GridJustification]: string } = {
  'flex-start': 'justify-start',
  center: 'justify-center',
  'flex-end': 'justify-end',
  'space-between': 'justify-between',
  'space-around': 'justify-around',
  'space-evenly': 'justify-evenly',
}

/*
Tailwind needs explicit classnames to include them in the build
.-m-[4px] .-m-[8px] .-m-[12px] .-m-[16px] .-m-[32px] .-m-[36px] .-m-[40px]
.width-calc-100pct-8px .width-calc-100pct-16px .width-calc-100pct-24px .width-calc-100pct-32px
.width-calc-100pct-64px .width-calc-100pct-72px .width-calc-100pct-80px
*/
const getGridSpacingClassName = (spacing: Props['spacing']) => {
  if (!spacing) {
    return ''
  }

  // Negative margin has half of the spacing value to properly handle space on sides of grid
  return `width-calc-100pct-${spacing}px -m-[${spacing / 2}px]`
}

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

  // DELETE_BEFORE_MERGE Default value comes from https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Grid/Grid.js#L233
  const directionClassName = directionClassNamesMapping[direction || 'row']
  // DELETE_BEFORE_MERGE Default value comes from https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Grid/Grid.js#L234
  const wrapClassName = wrapClassNamesMapping[wrap || 'wrap']
  // DELETE_BEFORE_MERGE Default value comes from https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Grid/Grid.js#L235
  const alignItemsClassName =
    alignItemsClassNamesMapping[alignItems || 'stretch']
  // DELETE_BEFORE_MERGE Default value comes from https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Grid/Grid.js#L237
  const justifyContentClassName =
    justifyContentClassNamesMapping[justifyContent || 'flex-start']

  const gridSpacingClassName = getGridSpacingClassName(gridSpacing)

  return (
    <GridContext.Provider value={{ gridSpacing }}>
      <div
        ref={ref}
        style={style}
        className={twMerge(
          // DELETE_BEFORE_MERGE https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Grid/Grid.js#L105
          'box-border',
          // DELETE_BEFORE_MERGE https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Grid/Grid.js#L106
          'flex',
          // DELETE_BEFORE_MERGE https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Grid/Grid.js#L108
          'w-full',
          directionClassName,
          wrapClassName,
          alignItemsClassName,
          justifyContentClassName,
          gridSpacingClassName,
          className
        )}
        {...rest}
      >
        {children}
      </div>
    </GridContext.Provider>
  )
})

Grid.defaultProps = {
  alignItems: 'flex-start',
  direction: 'row',
  justifyContent: 'flex-start',
  wrap: 'wrap',
}

Grid.displayName = 'Grid'

export default Grid
