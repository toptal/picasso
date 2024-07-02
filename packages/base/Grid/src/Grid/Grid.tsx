import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'
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
import { getGridSpacingClassName } from './utils/get-grid-spacing-class-name'
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

export const Grid = forwardRef<HTMLDivElement, Props>(function Grid(
  props,
  ref
) {
  const {
    children,
    spacing: userSpacing,
    direction = 'row',
    alignItems = 'flex-start',
    justifyContent = 'flex-start',
    wrap = 'wrap',
    className,
    ...rest
  } = props

  const responsiveSpacing = useResponsiveSpacing()
  const gridSpacing = userSpacing ?? responsiveSpacing

  const directionClassName = directionClassNamesMapping[direction]
  const wrapClassName = wrapClassNamesMapping[wrap]
  const alignItemsClassName = alignItemsClassNamesMapping[alignItems]
  const justifyContentClassName =
    justifyContentClassNamesMapping[justifyContent]

  const gridSpacingClassName = getGridSpacingClassName(gridSpacing)

  return (
    <GridContext.Provider value={{ gridSpacing }}>
      <div
        ref={ref}
        {...rest}
        className={twMerge(
          'box-border',
          'flex',
          'w-full',
          directionClassName,
          wrapClassName,
          alignItemsClassName,
          justifyContentClassName,
          gridSpacingClassName,
          className
        )}
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
