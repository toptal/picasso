import React, { ReactNode } from 'react'

import { Option, ItemProps, ValueType } from '../Select/types'

export interface Props<T extends ValueType> {
  options: Option<T>[]
  renderOption: (option: Option<T>, index: number) => ReactNode
  getItemProps: (option: Option<T>, index: number) => ItemProps
}

const NativeSelectOptions = <T extends ValueType>({
  options,
  renderOption,
  getItemProps
}: Props<T>) => (
  <>
    {options.map((option, index) => (
      <option
        key={(option?.key ?? option.value).toString()}
        value={option.value.toString()}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getItemProps(option, index)}
      >
        {renderOption(option, index)}
      </option>
    ))}
  </>
)

NativeSelectOptions.displayName = 'NativeSelectOptions'

export default NativeSelectOptions
