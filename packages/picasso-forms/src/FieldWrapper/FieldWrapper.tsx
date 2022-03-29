import React from 'react'

import Field, {
  Props as FieldProps,
  ValueType,
  IFormComponentProps
} from '../Field'
import FieldLabel from '../FieldLabel'

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
    <Field<IFormComponentProps, TInputValue>
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
    </Field>
  )
}

FieldWrapper.defaultProps = {}

FieldWrapper.displayName = 'FieldWrapper'

export default FieldWrapper
