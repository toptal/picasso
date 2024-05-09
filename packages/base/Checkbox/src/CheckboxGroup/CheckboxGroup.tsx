/* eslint-disable react/no-array-index-key */
import React from 'react'
import type { FormGroupProps } from '@material-ui/core'
import { FormGroup } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import cx from 'classnames'
import type { GridSizeProps, GridProps } from '@toptal/picasso-grid'
import { GridCompound as Grid } from '@toptal/picasso-grid'
import { twMerge } from 'tailwind-merge'

import styles from './styles'

type GridSpacing = GridProps['spacing']

export interface Props extends FormGroupProps, GridSizeProps {
  /** Align checkboxes horizontally  */
  horizontal?: boolean
  /** Defines amount of space between checkbox components (in px) */
  spacing?: GridSpacing
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoCheckboxGroup',
})

const CheckboxGroup = (props: Props) => {
  const { horizontal, spacing, xs, sm, md, lg, xl, className, ...rest } = props

  const classes = useStyles()
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
        className={twMerge('mt-0', 'mb-0')}
      >
        {children.map((child, index) => (
          <Grid.Item
            key={index}
            className={twMerge('leading-none', '[&&]:pt-0', '[&&]:pb-0')}
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
          >
            {child}
          </Grid.Item>
        ))}
      </Grid>
    </FormGroup>
  )
}

CheckboxGroup.defaultProps = {
  horizontal: false,
}

export default CheckboxGroup
