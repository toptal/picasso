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

export type FieldProps<InputValue> = FinalFieldProps<
  InputValue,
  FieldRenderProps<InputValue, HTMLInputElement>,
  HTMLInputElement
>

export type Props<InputValue, InputProps> = InputProps &
  FieldProps<InputValue> & {
    name: string
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

export const FieldWrapper = <T extends ValueType, InputProps>(
  props: Props<T, InputProps>
) => {
  const { name, validate, hint, label, required, inputType, ...rest } = props

  return (
    <FinalField name={name} validate={getValidators(required, validate)}>
      {({ input, meta }) => {
        const error = getInputError<T>(meta)
        const inputElement = React.cloneElement(inputType, {
          name,
          meta,
          error: Boolean(error),
          ...rest,
          ...input
        })

        return (
          <PicassoForm.Field error={error} hint={hint}>
            {label && (
              <PicassoForm.Label required={required} htmlFor={name}>
                {label}
              </PicassoForm.Label>
            )}
            {inputElement}
          </PicassoForm.Field>
        )
      }}
    </FinalField>
  )
}

FieldWrapper.defaultProps = {}

FieldWrapper.displayName = 'FieldWrapper'

export default FieldWrapper
