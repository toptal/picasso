import React, { FunctionComponent } from 'react'
import FormGroup, { FormGroupProps } from '@material-ui/core/FormGroup'
import { GridSize } from '@material-ui/core/Grid'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import cx from 'classnames'

import Grid, { GridProps } from '../Grid'
import styles from './styles'

type GridSpacing = GridProps['spacing']

export interface Props extends FormGroupProps {
  /** Align checkboxes horizontally  */
  horizontal?: boolean
  /** Defines amount of space between checkbox components (in px) */
  spacing?: GridSpacing
  /** Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority */
  small?: boolean | GridSize
  /** Defines the number of grids the component is going to use. It's applied for the medium breakpoint and wider screens */
  medium?: boolean | GridSize
  /** Defines the number of grids the component is going to use. It's applied for the large breakpoint and wider screens */
  large?: boolean | GridSize
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoCheckboxGroup'
})

const CheckboxGroup: FunctionComponent<Props> = props => {
  const {
    horizontal,
    spacing,
    small,
    medium,
    large,
    className,
    ...rest
  } = props

  const { grid: gridClass, gridItem: gridItemClass, ...classes } = useStyles()
  const { spacing: themeSpacing } = useTheme()

  const direction = horizontal ? 'row' : 'column'
  const gridSpacing = spacing ?? horizontal ? themeSpacing(2) : 0

  const children = React.Children.toArray(rest.children)

  return (
    <FormGroup
      {...rest}
      classes={classes}
      className={cx(classes.root, className)}
    >
      <Grid
        direction={direction}
        spacing={gridSpacing as GridSpacing}
        className={gridClass}
      >
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
    </FormGroup>
  )
}

CheckboxGroup.defaultProps = {
  horizontal: false
}

export default CheckboxGroup
