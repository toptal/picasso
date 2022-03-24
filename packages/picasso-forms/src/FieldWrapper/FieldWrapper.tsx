import React, { ChangeEvent, FocusEvent, useEffect } from 'react'
import {
  useField,
  FieldProps as FinalFieldProps,
  FieldMetaState,
  FieldRenderProps
} from 'react-final-form'
import {
  Form as PicassoForm,
  DateOrDateRangeType,
  OutlinedInputStatus
} from '@toptal/picasso'
import { Item } from '@toptal/picasso/Autocomplete'
import { FileUpload } from '@toptal/picasso/FileInput'
import { TextLabelProps } from '@toptal/picasso-shared'

import { useFormContext } from '../Form/FormContext'
import { useFormConfig, FormConfigProps } from '../FormConfig'
import { validators } from '../utils'

const { composeValidators, required: requiredValidator } = validators

export type ValueType =
  | string
  | string[]
  | number
  | boolean
  | null
  | undefined
  | FileUpload[]
  | DateOrDateRangeType
  | Item
  | Item[]

export type FieldProps<TInputValue> = FinalFieldProps<
  TInputValue,
  FieldRenderProps<TInputValue, HTMLInputElement>,
  HTMLInputElement
> &
  TextLabelProps

export interface IFormComponentProps {
  value?: ValueType
}

export type Props<
  TWrappedComponentProps extends IFormComponentProps,
  TInputValue
> = TWrappedComponentProps &
  FieldProps<TInputValue> & {
    name: string
    type?: string
    label?: React.ReactNode
    fieldType?: string
    status?: OutlinedInputStatus
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: (props: any) => React.ReactNode
    renderFieldRequirements?: (props: {
      value?: TInputValue
      error?: boolean
    }) => React.ReactNode
  }

type FieldMeta<T> = FieldMetaState<T> & {
  dirtyAfterBlur?: boolean
}

export const getInputError = <T extends ValueType>(
  meta: FieldMeta<T>,
  formConfig: FormConfigProps
) => {
  if (formConfig.validateOnSubmit && meta.modifiedSinceLastSubmit) {
    return null
  }

  if (!meta.error && !meta.submitError) {
    return null
  }

  if (!meta.touched) {
    return null
  }

  if (meta.error) {
    return meta.error
  }

  if (meta.dirtySinceLastSubmit) {
    return null
  }

  return meta.submitError
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  TWrappedComponentProps extends IFormComponentProps,
  TInputValue extends ValueType = TWrappedComponentProps['value']
>(
  props: Props<TWrappedComponentProps, TInputValue>
) => {
  const {
    type,
    hint,
    label,
    required,
    'data-testid': dataTestId,
    renderFieldRequirements,
    status,
    // FieldProps - https://final-form.org/docs/react-final-form/types/FieldProps
    afterSubmit,
    allowNull,
    beforeSubmit,
    children,
    data,
    defaultValue,
    format,
    formatOnBlur,
    initialValue,
    isEqual,
    name,
    id = name,
    parse,
    subscription,
    validate,
    validateFields,
    value,
    //
    ...rest
  } = props

  const formConfig = useFormConfig()
  const { setValidators, clearValidators } = useFormContext()
  const validators = getValidators(required, validate)

  if (formConfig.validateOnSubmit) {
    setValidators(name, validators)
  }

  useEffect(() => {
    return () => {
      if (formConfig.validateOnSubmit) {
        clearValidators(name)
      }
    }
  }, [clearValidators, formConfig.validateOnSubmit, name])

  const { meta, input } = useField<TInputValue>(name, {
    validate: formConfig.validateOnSubmit ? undefined : validators,
    type,
    afterSubmit,
    allowNull,
    beforeSubmit,
    data,
    defaultValue,
    format,
    formatOnBlur,
    initialValue,
    isEqual,
    parse,
    subscription,
    validateFields,
    value
  })

  const error = getInputError<TInputValue>(meta, formConfig)

  const childProps: Record<string, unknown> = {
    id,
    status,
    ...rest,
    ...input,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (event: ChangeEvent<HTMLElement> | any) => {
      input.onChange(event)

      if (rest.onChange) {
        rest.onChange(event)
      }
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      input.onBlur(event)

      if (rest.onBlur) {
        rest.onBlur(event)
      }
    },
    onFocus: (event: FocusEvent<HTMLElement>) => {
      input.onFocus(event)

      if (rest.onFocus) {
        rest.onFocus(event)
      }
    }
  }

  return (
    <PicassoForm.Field
      error={error}
      hint={hint}
      data-testid={dataTestId}
      fieldRequirements={renderFieldRequirements?.({
        value: input.value,
        error: status === 'error'
      })}
    >
      {label}
      {children(childProps)}
    </PicassoForm.Field>
  )
}

FieldWrapper.defaultProps = {}

FieldWrapper.displayName = 'FieldWrapper'

export default FieldWrapper
