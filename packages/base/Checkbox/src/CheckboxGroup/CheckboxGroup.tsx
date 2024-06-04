/* eslint-disable react/no-array-index-key */
import type { HTMLAttributes } from 'react'
import React from 'react'
import type { GridSizeProps, GridProps } from '@toptal/picasso-grid'
import { GridCompound as Grid } from '@toptal/picasso-grid'
import { twMerge } from 'tailwind-merge'

type GridSpacing = GridProps['spacing']

export interface Props extends HTMLAttributes<HTMLDivElement>, GridSizeProps {
  /** Align checkboxes horizontally  */
  horizontal?: boolean
  /** Defines amount of space between checkbox components (in px) */
  spacing?: GridSpacing
}

const HORIZONTAL_SPACING = 16

const CheckboxGroup = (props: Props) => {
  const { horizontal, spacing, xs, sm, md, lg, xl, className, ...rest } = props

  const direction = horizontal ? 'row' : 'column'
  const gridSpacing = spacing ?? horizontal ? HORIZONTAL_SPACING : 0

  const children = React.Children.toArray(rest.children)

  return (
    <div
      {...rest}
      className={twMerge(
        'flex flex-col flex-wrap -mr-[0.5em] -mb-[0.5em]',
        horizontal && 'flex-row',
        className
      )}
    >
      <Grid
        direction={direction}
        spacing={gridSpacing as GridSpacing}
        className='mt-0 mb-0'
      >
        {children.map((child, index) => (
          <Grid.Item
            key={index}
            className='leading-none pt-0 pb-0 [&>label]:mb-[0.5em]'
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
    </div>
  )
}

CheckboxGroup.defaultProps = {
  horizontal: false,
}

export default CheckboxGroup
