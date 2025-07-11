import React from 'react'

import type { Props as FieldProps } from '../Field'
import type { ValueType, IFormComponentProps } from '../FieldBase'
import type { Props as FieldLabelProps } from '../FieldLabel'
import FieldLabel from '../FieldLabel'
import InputField from '../InputField'

export type Props<
  TWrappedComponentProps extends IFormComponentProps,
  TInputValue
> = Omit<FieldProps<TWrappedComponentProps, TInputValue>, 'label'> &
  Omit<FieldLabelProps, 'name'>

const FieldWrapper = <
  TWrappedComponentProps extends IFormComponentProps,
  TInputValue extends ValueType = TWrappedComponentProps['value']
>(
  props: Props<TWrappedComponentProps, TInputValue>
) => {
  const { label, labelEndAdornment, name, titleCase, children, ...rest } = props

  return (
    <InputField<IFormComponentProps, TInputValue>
      {...rest}
      name={name}
      label={
        label ? (
          <FieldLabel
            name={name}
            required={props.required}
            label={label}
            labelEndAdornment={labelEndAdornment}
            titleCase={titleCase}
          />
        ) : null
      }
    >
      {children}
    </InputField>
  )
}

FieldWrapper.displayName = 'FieldWrapper'

export default FieldWrapper
