import React from 'react'
import type { ComponentProps } from 'react'

import { Select } from '../Select'

const OPTIONS: {
  label: string
  name: boolean
}[] = [
  {
    label: 'Yes',
    name: true,
  },
  {
    label: 'No',
    name: false,
  },
]

type SelectProps = ComponentProps<typeof Select>

export const BooleanInput = (props: Omit<SelectProps, 'options'>) => (
  <Select {...props} options={OPTIONS as unknown as SelectProps['options']} />
)
