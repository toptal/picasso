/* eslint-disable react/no-array-index-key */
import React from 'react'
import type { RadioGroupProps } from '@material-ui/core'
import { RadioGroup as MUIRadioGroup } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import type { GridSizeProps, GridProps } from '@toptal/picasso-grid'
import { GridCompound as Grid } from '@toptal/picasso-grid'

import styles from './styles'

type GridSpacing = GridProps['spacing']

export interface Props extends RadioGroupProps, GridSizeProps {
  /** Align radios horizontally  */
  horizontal?: boolean
  /** Defines amount of space between radio buttons components (in px) */
  spacing?: GridSpacing
}

// Using { index: -1 } to inject CSS link to the bottom of the head
// in order to prevent FormControlLabel's styles to override RadioGroup's ones
// Related Jira issue: https://toptal-core.atlassian.net/browse/FX-1520
const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoRadioGroup',
  index: -1,
})

const RadioGroup = (props: Props) => {
  const { horizontal, spacing, xs, sm, md, lg, xl, ...rest } = props
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
        className={`${gridClass} mt-0 mb-0`}
      >
        {children.map((child, index) => (
          <Grid.Item
            key={index}
            className={gridItemClass}
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
    </MUIRadioGroup>
  )
}

RadioGroup.defaultProps = {
  horizontal: false,
}

export default RadioGroup
