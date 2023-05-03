import type { ReactNode, HTMLAttributes } from 'react'
import React, { useMemo, forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type {
  GridSpacing,
  GridItemsAlignment,
  GridDirection,
  GridJustification,
  GridWrap,
} from '@material-ui/core'
import { Grid as MUIGrid } from '@material-ui/core'
import type { BaseProps } from '@toptal/picasso-shared'
import { useScreens } from '@toptal/picasso-provider'

import styles from './styles'

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

const humanToMUISpacing = (spacing: number) => {
  /** Material Design margins and columns follow an 8px square baseline grid */
  return (spacing / 8) as GridSpacing
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoGrid',
})

const useResponsiveSpacing = () => {
  const screens = useScreens()

  return screens({
    xs: 16,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 32,
  }) as number
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
  const classes = useStyles()
  const responsiveSpacing = useResponsiveSpacing()
  const gridSpacing = humanToMUISpacing(userSpacing || responsiveSpacing)

  return useMemo(
    () => (
      <MUIGrid
        {...rest}
        ref={ref}
        container
        spacing={gridSpacing}
        direction={direction}
        alignItems={alignItems}
        justifyContent={justifyContent}
        wrap={wrap}
        classes={classes}
        className={className}
        style={style}
      >
        {children}
      </MUIGrid>
    ),
    [
      ref,
      gridSpacing,
      direction,
      alignItems,
      justifyContent,
      wrap,
      classes,
      className,
      style,
      children,
      ...Object.values(rest),
    ]
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
