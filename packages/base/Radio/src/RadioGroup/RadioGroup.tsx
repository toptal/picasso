/* eslint-disable react/no-array-index-key */
import type { ChangeEvent, HTMLAttributes } from 'react'
import React, { useState } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import type { GridSizeProps, GridProps } from '@toptal/picasso-grid'
import { GridCompound as Grid } from '@toptal/picasso-grid'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { RadioGroupContext } from '../RadioGroupContext'

type GridSpacing = GridProps['spacing']

// MUI v4 `theme.spacing(2)`, preserved verbatim from the pre-migration default
const HORIZONTAL_SPACING = 16

export interface Props
  extends BaseProps,
    GridSizeProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Align radios horizontally  */
  horizontal?: boolean
  /** Defines amount of space between radio buttons components (in px) */
  spacing?: GridSpacing
  /** Name used to identify the `Radio` components in the group */
  name?: string
  /** Value of the currently selected `Radio` in the group */
  value?: string | number | boolean
  /** Value of the initially selected `Radio` for an uncontrolled group */
  defaultValue?: string | number | boolean
  /** Callback invoked when a `Radio` in the group is selected */
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void
}

const RadioGroup = ({ horizontal = false, ...props }: Props) => {
  const {
    spacing,
    xs,
    sm,
    md,
    lg,
    xl,
    name,
    value,
    defaultValue,
    onChange,
    className,
    children,
    ...rest
  } = props
  const [internalValue, setInternalValue] = useState(defaultValue)
  const groupValue = value !== undefined ? value : internalValue

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    newValue: string
  ) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(event, newValue)
  }

  const direction = horizontal ? 'row' : 'column'
  const gridSpacing = spacing ?? (horizontal ? HORIZONTAL_SPACING : 0)

  const items = React.Children.toArray(children)

  return (
    <div
      role='radiogroup'
      {...rest}
      className={twMerge('flex flex-col flex-wrap', className)}
    >
      <RadioGroupContext.Provider
        value={{ name, value: groupValue, onChange: handleChange }}
      >
        <Grid
          direction={direction}
          spacing={gridSpacing as GridSpacing}
          className='mt-0 mb-0'
        >
          {items.map((child, index) => (
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
      </RadioGroupContext.Provider>
    </div>
  )
}

export default RadioGroup
