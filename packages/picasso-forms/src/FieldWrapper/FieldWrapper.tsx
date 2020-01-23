import React from 'react'
import {
  Field as FinalField,
  FieldProps as FinalFieldProps,
  FieldMetaState,
  FieldRenderProps
} from 'react-final-form'
import { Form as PicassoForm } from '@toptal/picasso'

import { validators } from '../utils'

const { composeValidators, required: requiredValidator } = validators

type ValueType = string | string[] | number | boolean | undefined

export type FieldProps<TInputValue> = FinalFieldProps<
  TInputValue,
  FieldRenderProps<TInputValue, HTMLInputElement>,
  HTMLInputElement
>

export type Props<
  TInputValue,
  TWrappedComponentProps
> = TWrappedComponentProps &
  FieldProps<TInputValue> & {
    name: string
    children: (props: any) => React.ReactNode
    type?: string
  }

const getInputError = <T extends ValueType>(meta: FieldMetaState<T>) => {
  if (!meta.error) {
    return null
  }

  if (meta.error && (meta.modified || meta.touched)) {
    return meta.error
  }

  if (meta.submitError && !meta.dirtySinceLastSubmit) {
    return meta.submitError
  }
}

const getValidators = (required: boolean, validate?: any) => {
  if (required && validate) {
    return composeValidators([requiredValidator, validate])
  }

  if (required && !validate) {
    return requiredValidator
  }

  return validate
}

const FieldWrapper = <
  TWrappedComponentProps extends { value?: ValueType },
  TInputValue extends ValueType = TWrappedComponentProps['value']
>(
  props: Props<TInputValue, TWrappedComponentProps>
) => {
  const { name, validate, hint, label, required, type, children, value } = props

  return (
    <FinalField
      name={name}
      validate={getValidators(required, validate)}
      type={type}
      value={value}
    >
      {({ input, meta }) => {
        const error = getInputError<TInputValue>(meta)

        return (
          <PicassoForm.Field error={error} hint={hint}>
            {label && (
              <PicassoForm.Label required={required} htmlFor={name}>
                {label}
              </PicassoForm.Label>
            )}
            {children({
              ...props,
              ...input,
              error: Boolean(error)
            })}
          </PicassoForm.Field>
        )
      }}
    </FinalField>
  )
}

FieldWrapper.defaultProps = {}

FieldWrapper.displayName = 'FieldWrapper'

export default FieldWrapper
