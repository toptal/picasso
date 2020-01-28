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

type ValueType = string | string[] | number | boolean | undefined | File

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
    type?: string
    hideFieldLabel?: boolean
    fieldType?: string
    children: (props: any) => React.ReactNode
  }

const getInputError = <T extends ValueType>(meta: FieldMetaState<T>) => {
  if (!meta.error) {
    return null
  }

  if (meta.error && meta.touched) {
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

const getProps = ({
  hideFieldLabel,
  error,
  label,
  required
}: {
  hideFieldLabel?: boolean
  error: string
  label: string
  required: boolean
}) => {
  if (hideFieldLabel) {
    return {
      label,
      required
    }
  }
  return {
    error: Boolean(error)
  }
}

const FieldWrapper = <
  TWrappedComponentProps extends { value?: ValueType },
  TInputValue extends ValueType = TWrappedComponentProps['value']
>(
  props: Props<TInputValue, TWrappedComponentProps>
) => {
  const {
    type,
    hideFieldLabel,
    name,
    validate,
    hint,
    label,
    required,
    children,
    value,
    ...rest
  } = props

  return (
    <FinalField
      name={name}
      validate={getValidators(required, validate)}
      type={type}
      value={value}
    >
      {({ input, meta }) => {
        const error = getInputError<TInputValue>(meta)
        const childProps = {
          ...rest,
          ...input,
          ...getProps({ hideFieldLabel, error, label, required })
        }

        return (
          <PicassoForm.Field error={error} hint={hint}>
            {!hideFieldLabel && label && (
              <PicassoForm.Label required={required} htmlFor={name}>
                {label}
              </PicassoForm.Label>
            )}
            {children(childProps)}
          </PicassoForm.Field>
        )
      }}
    </FinalField>
  )
}

FieldWrapper.defaultProps = {}

FieldWrapper.displayName = 'FieldWrapper'

export default FieldWrapper
