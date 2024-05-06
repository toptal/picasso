import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { type BaseProps } from '@toptal/picasso-shared'
import type { BreakpointKeys } from '@toptal/picasso-provider'
import { useCurrentBreakpointRange } from '@toptal/picasso-provider'

import GridContext from '../GridContext/GridContext'
import type {
  GridDirection,
  GridItemsAlignment,
  GridJustification,
  GridWrap,
} from '../types'

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
const getJustifyContentClassName = (
  justifyContent: Props['justifyContent']
) => {
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
// -m-[4px] -m-[8px] -m-[12px] -m-[16px] -m-[20px] -m-[24px] -m-[28px] -m-[32px] -m-[36px] -m-[40px] -m-[44px] -m-[48px] -m-[52px] -m-[56px] -m-[60px] -m-[64px] -m-[68px] -m-[72px] -m-[76px] -m-[80px] -m-[84px] -m-[88px] -m-[92px] -m-[96px] -m-[100px] -m-[104px] -m-[108px] -m-[112px] -m-[116px] -m-[120px] -m-[124px] -m-[128px] -m-[132px] -m-[136px] -m-[140px] -m-[144px] -m-[148px] -m-[152px] -m-[156px] -m-[160px] -m-[164px] -m-[168px] -m-[172px] -m-[176px] -m-[180px] -m-[184px] -m-[188px] -m-[192px] -m-[196px] -m-[200px] -m-[204px] -m-[208px] -m-[212px] -m-[216px] -m-[220px] -m-[224px] -m-[228px] -m-[232px] -m-[236px] -m-[240px] -m-[244px] -m-[248px] -m-[252px] -m-[256px] -m-[260px] -m-[264px] -m-[268px] -m-[272px] -m-[276px] -m-[280px] -m-[284px] -m-[288px] -m-[292px] -m-[296px] -m-[300px] -m-[304px] -m-[308px] -m-[312px] -m-[316px] -m-[320px] -m-[324px] -m-[328px] -m-[332px] -m-[336px] -m-[340px] -m-[344px] -m
// width-calc-100pct-16px width-calc-100pct-24px width-calc-100pct-32px width-calc-100pct-40px width-calc-100pct-48px width-calc-100pct-56px width-calc-100pct-64px width-calc-100pct-72px width-calc-100pct-80px
const getGridSpacingClassName = (spacing: Props['spacing']) => {
  if (spacing === 0 || spacing === undefined) {
    return ''
  }

  return `width-calc-100pct-${spacing}px -m-[${spacing / 2}px]`
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

  const justifyContentClassName = getJustifyContentClassName(justifyContent)
  const alignItemsClassName = getAlignItemsClassName(alignItems)
  const wrapClassName = getWrapClassName(wrap)
  const directionClassName = getDirectionClassName(direction)

  // TODO: tmp hack
  const gridSpacingClassName = getGridSpacingClassName(
    gridSpacing as unknown as Props['spacing']
  )

  return (
    <GridContext.Provider
      value={{
        spacing: gridSpacing,
      }}
    >
      <div
        ref={ref}
        style={style}
        className={twMerge(
          // TODO: prove the usage
          'flex',
          // TODO: prove the usage
          'w-full',
          justifyContentClassName,
          alignItemsClassName,
          wrapClassName,
          directionClassName,
          gridSpacingClassName,
          className
        )}
        // TODO: no more rest + BaseProps
        {...rest}
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
