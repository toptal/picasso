import React from 'react'
import { GridSize } from '@material-ui/core/Grid'
import MUIRadioGroup, { RadioGroupProps } from '@material-ui/core/RadioGroup'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'

import Grid, { GridProps } from '../Grid'
import styles from './styles'

type GridSpacing = GridProps['spacing']

export interface Props extends RadioGroupProps {
  /** Align radios horizontally  */
  horizontal?: boolean
  /** Defines amount of space between radio buttons components (in px) */
  spacing?: GridSpacing
  /** Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority */
  small?: boolean | GridSize
  /** Defines the number of grids the component is going to use. It's applied for the medium breakpoint and wider screens */
  medium?: boolean | GridSize
  /** Defines the number of grids the component is going to use. It's applied for the large breakpoint and wider screens */
  large?: boolean | GridSize
}

// Using { index: -1 } to inject CSS link to the bottom of the head
// in order to prevent FormControlLabel's styles to override RadioGroup's ones
// Related Jira issue: https://toptal-core.atlassian.net/browse/FX-1520
const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoRadioGroup',
  index: -1
})

const RadioGroup = (props: Props) => {
  const { horizontal, spacing, small, medium, large, ...rest } = props
  const { grid: gridClass, gridItem: gridItemClass, ...classes } = useStyles()
  const { spacing: themeSpacing } = useTheme()

  const direction = horizontal ? 'row' : 'column'
  const gridSpacing = spacing ?? horizontal ? themeSpacing(2) : 0

  const children = React.Children.toArray(rest.children)

  return (
    <MUIRadioGroup {...rest} classes={classes}>
      <Grid
        direction={direction}
        spacing={gridSpacing as GridSpacing}
        className={gridClass}
      >
        {children.map((child, index) => (
          <Grid.Item
            key={String(index)}
            className={gridItemClass}
            small={small}
            medium={medium}
            large={large}
          >
            {child}
          </Grid.Item>
        ))}
      </Grid>
    </MUIRadioGroup>
  )
}

RadioGroup.defaultProps = {
  horizontal: false
}

export default RadioGroup
