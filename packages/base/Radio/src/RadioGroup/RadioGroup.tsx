/* eslint-disable react/no-array-index-key */
import React from 'react'
import type { RadioGroupProps } from '@material-ui/core'
import { RadioGroup as MUIRadioGroup } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import type { GridSizeProps, GridProps } from '@toptal/picasso-grid'
import { GridCompound as Grid } from '@toptal/picasso-grid'

type GridSpacing = GridProps['spacing']

export interface Props extends RadioGroupProps, GridSizeProps {
  /** Align radios horizontally  */
  horizontal?: boolean
  /** Defines amount of space between radio buttons components (in px) */
  spacing?: GridSpacing
}

const RadioGroup = (props: Props) => {
  const { horizontal, spacing, xs, sm, md, lg, xl, ...rest } = props
  const { spacing: themeSpacing } = useTheme()

  const direction = horizontal ? 'row' : 'column'
  const gridSpacing = spacing ?? horizontal ? themeSpacing(2) : 0

  const children = React.Children.toArray(rest.children)

  return (
    <MUIRadioGroup {...rest}>
      <Grid
        direction={direction}
        spacing={gridSpacing as GridSpacing}
        className='mt-0 mb-0'
      >
        {children.map((child, index) => (
          <Grid.Item
            key={index}
            className='leading-none [&&]:pt-0 [&&]:pb-0'
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
