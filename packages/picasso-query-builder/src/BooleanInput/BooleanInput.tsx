import React, { useEffect, useState } from 'react'
import type { ComponentProps } from 'react'

import { Select } from '../Select'
import type { BooleanField } from '../types/query-builder'

const OPTIONS = [
  {
    label: 'Yes',
    name: 'true',
  },
  {
    label: 'No',
    name: 'false',
  },
]

type SelectProps = ComponentProps<typeof Select>

type BooleanInputProps = Omit<
  SelectProps,
  'options' | 'value' | 'fieldData'
> & {
  value: boolean
  fieldData: BooleanField
}

export const BooleanInput = ({
  value,
  handleOnChange,
  ...rest
}: BooleanInputProps) => {
  const [inputValue, setInputValue] = useState<boolean | undefined>(value)

  useEffect(() => {
    handleOnChange(inputValue)
  }, [inputValue, handleOnChange])

  const handleChange = (changedValue: string) => {
    setInputValue(changedValue === 'true' ? true : false)
  }

  return (
    <Select
      value={String(inputValue)}
      handleOnChange={handleChange}
      options={OPTIONS}
      {...rest}
    />
  )
}
