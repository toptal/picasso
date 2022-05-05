import React from 'react'

import { Props as FieldProps, IFormComponentProps } from '../Field'
import FieldLabel from '../FieldLabel'
import InputField from '../InputField'
import { ValueType } from '../types'

export type Props<TWrappedComponentProps, TInputValue> = Omit<
  FieldProps<TWrappedComponentProps, TInputValue>,
  'label'
> & { label?: string }

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
