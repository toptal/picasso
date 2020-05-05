import React from 'react'
import { Select as PicassoSelect } from '@toptal/picasso'
import { SelectProps, ValueType } from '@toptal/picasso/Select'
import { generateRandomStringOrGetEmptyInTest } from '@toptal/picasso/utils'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props<T extends ValueType, M extends boolean = false> = SelectProps<
  T,
  M
> &
  FieldProps<SelectProps<T, M>['value']>

export const Select = <T extends ValueType, M extends boolean = false>({
  name,
  id = name,
  ...rest
}: Props<T, M>) => {
  const randomizedId = id ? generateRandomStringOrGetEmptyInTest(id) : undefined

  return (
    <FieldWrapper<SelectProps<any, any>>
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      name={name}
      id={randomizedId}
    >
      {(selectProps: SelectProps) => {
        return (
          <PicassoSelect
            // eslint-disable-next-line react/jsx-props-no-spreading
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
