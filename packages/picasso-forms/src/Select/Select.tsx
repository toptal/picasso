import React from 'react'
import {
  Select as PicassoSelect,
  SelectProps,
  SelectValueType
} from '@toptal/picasso'
import { generateRandomStringOrGetEmptyInTest } from '@toptal/picasso/utils'

import { FieldProps } from '../FieldWrapper'
import InputFieldWrapper from '../InputFieldWrapper'
import FieldLabel from '../FieldLabel'

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
    <InputFieldWrapper<SelectProps<any, any>>
      {...rest}
      name={name}
      id={randomizedId}
      label={
        rest.label ? (
          <FieldLabel
            id={rest.id}
            required={rest.required}
            label={rest.label}
            titleCase={rest.titleCase}
          />
        ) : null
      }
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
    </InputFieldWrapper>
  )
}

Select.defaultProps = {}

Select.displayName = 'Select'

export default Select
