import React, { FunctionComponent } from 'react'
import { GridSize } from '@material-ui/core/Grid'
import MUIRadioGroup, { RadioGroupProps } from '@material-ui/core/RadioGroup'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Grid, { GridProps } from '../Grid'
import styles from './styles'

export interface Props extends RadioGroupProps {
  /** Align radios horizontally  */
  horizontal?: boolean
  /** Defines amount of space between radio buttons components (in px) */
  spacing?: GridProps['spacing']
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

const RadioGroup: FunctionComponent<Props> = props => {
  const { horizontal, spacing, small, medium, large, ...rest } = props
  const { grid: gridClass, gridItem: gridItemClass, ...classes } = useStyles()

  const direction = horizontal ? 'row' : 'column'
  const gridSpacing = spacing ?? horizontal ? 16 : 0

  const children = React.Children.toArray(rest.children)

  return (
    <MUIRadioGroup {...rest} classes={classes}>
      <Grid direction={direction} spacing={gridSpacing} className={gridClass}>
        {children.map((child, index) => (
          <Grid.Item
            key={index}
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
