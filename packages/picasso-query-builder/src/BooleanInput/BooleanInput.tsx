import React from 'react'
import type { ComponentProps } from 'react'

import { Select } from '../Select/Select'

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

const BooleanInput = (props: Omit<SelectProps, 'options'>) => (
  <Select {...props} options={OPTIONS as unknown as SelectProps['options']} />
)

export default BooleanInput
