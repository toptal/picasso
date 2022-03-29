import React, { ChangeEvent, FocusEvent, useMemo } from 'react'
import {
  useField,
  FieldProps as FinalFieldProps,
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

import { useFormConfig } from '../FormConfig'
import { validators, useFieldValidation } from '../utils'

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

const Field = <
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

  const { validateOnSubmit: shouldValidateOnSubmit } = useFormConfig()
  const validators = useMemo(
    () => getValidators(required, validate),
    [required, validate]
  )

  const { meta, input } = useField<TInputValue>(name, {
    validate: shouldValidateOnSubmit ? undefined : validators,
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

  const error = useFieldValidation({
    name,
    meta,
    validators,
    shouldValidateOnSubmit
  })

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

Field.defaultProps = {}

Field.displayName = 'Field'

export default Field
