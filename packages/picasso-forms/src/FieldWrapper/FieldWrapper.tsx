import React from 'react'

import type { Props as FieldProps } from '../Field'
import type { ValueType, IFormComponentProps } from '../FieldBase'
import FieldLabel from '../FieldLabel'
import InputField from '../InputField'

export type Props<TWrappedComponentProps, TInputValue> = Omit<
  FieldProps<TWrappedComponentProps, TInputValue>,
  'label'
> & { label?: React.ReactNode }

const FieldWrapper = <
  TWrappedComponentProps extends IFormComponentProps,
  TInputValue extends ValueType = TWrappedComponentProps['value']
>(
  props: Props<TWrappedComponentProps, TInputValue>
) => {
  const { label, name, titleCase, children, ...rest } = props

  return (
    <InputField<IFormComponentProps, TInputValue>
      {...rest}
      name={name}
      label={
        label ? (
          <FieldLabel
            name={props.name}
            required={props.required}
            label={label}
            titleCase={titleCase}
          />
        ) : null
      }
    >
      {children}
    </InputField>
  )
}

FieldWrapper.defaultProps = {}

FieldWrapper.displayName = 'FieldWrapper'

export default FieldWrapper
