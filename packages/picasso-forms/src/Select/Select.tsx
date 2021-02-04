import React from 'react'
import {
  Select as PicassoSelect,
  SelectProps,
  SelectValueType
} from '@toptal/picasso'
import { generateRandomStringOrGetEmptyInTest } from '@toptal/picasso/utils'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props<
  T extends SelectValueType,
  M extends boolean = false
> = SelectProps<T, M> & FieldProps<SelectProps<T, M>['value']>

export const Select = <T extends SelectValueType, M extends boolean = false>({
  name,
  id = name,
  ...rest
}: Props<T, M>) => {
  const randomizedId = id ? generateRandomStringOrGetEmptyInTest(id) : undefined

  return (
    <FieldWrapper<SelectProps<any, any>>
      {...rest}
      name={name}
      id={randomizedId}
    >
      {(selectProps: SelectProps) => {
        return (
          <PicassoSelect
            {...selectProps}
            id={randomizedId}
            // if `id` is specified, we have to provide a not correct value for autoComplete, e.g. `none` to trick google chrome
            autoComplete={id ? 'none' : rest.autoComplete || 'off'}
          />
        )
      }}
    </FieldWrapper>
  )
}

Select.defaultProps = {}

Select.displayName = 'Select'

export default Select
