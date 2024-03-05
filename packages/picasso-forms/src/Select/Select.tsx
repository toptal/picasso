import React from 'react'
import type { SelectProps, SelectValueType } from '@toptal/picasso'
import { Select as PicassoSelect } from '@toptal/picasso'
import { generateRandomStringOrGetEmptyInTest } from '@toptal/picasso-utils'

import type { FieldProps } from '../Field'
import InputField from '../InputField'
import FieldLabel from '../FieldLabel'
import type { Props as FieldLabelProps } from '../FieldLabel'

export type Props<
  T extends SelectValueType,
  M extends boolean = false
> = SelectProps<T, M> & FieldProps<SelectProps<T, M>['value']> & FieldLabelProps

export const Select = <T extends SelectValueType, M extends boolean = false>(
  props: Props<T, M>
) => {
  const {
    name,
    id = name,
    label,
    labelEndAdornment,
    titleCase,
    ...rest
  } = props
  const randomizedId = id ? generateRandomStringOrGetEmptyInTest(id) : undefined

  return (
    <InputField<SelectProps<any, any>>
      {...rest}
      name={name}
      id={randomizedId}
      label={
        label ? (
          <FieldLabel
            name={randomizedId}
            required={rest.required}
            label={label}
            labelEndAdornment={labelEndAdornment}
            titleCase={titleCase}
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
    </InputField>
  )
}

Select.defaultProps = {}

Select.displayName = 'Select'

export default Select
