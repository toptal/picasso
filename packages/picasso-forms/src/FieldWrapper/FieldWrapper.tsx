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

type ValueType = string | number

export type FieldProps<TValue> = FinalFieldProps<
  TValue,
  FieldRenderProps<TValue, HTMLInputElement>,
  HTMLInputElement
>

export type Props<TValue, TWrappedComponentProps> = TWrappedComponentProps &
  FieldProps<TValue> & {
    name: string
    children: (props: any) => React.ReactNode
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

const FieldWrapper = <TValue extends ValueType, TWrappedComponentProps>(
  props: Props<TValue, TWrappedComponentProps>
) => {
  const { name, validate, hint, label, required, children, ...rest } = props

  return (
    <FinalField name={name} validate={getValidators(required, validate)}>
      {({ input, meta }) => {
        const error = getInputError<TValue>(meta)

        return (
          <PicassoForm.Field error={error} hint={hint}>
            {label && (
              <PicassoForm.Label required={required} htmlFor={name}>
                {label}
              </PicassoForm.Label>
            )}
            {typeof children === 'function' &&
              children({
                error: Boolean(error),
                ...rest,
                ...input
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
