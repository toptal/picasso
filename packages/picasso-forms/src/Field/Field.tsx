import type { ChangeEvent, FocusEvent } from 'react'
import React, { useMemo } from 'react'
import type {
  FieldProps as FinalFieldProps,
  FieldRenderProps,
} from 'react-final-form'
import { useField } from 'react-final-form'
import type { Status as OutlinedInputStatus } from '@toptal/picasso-outlined-input'
import { FormCompound as PicassoForm } from '@toptal/picasso-form'
import type { TextLabelProps } from '@toptal/picasso-shared'
import { detect } from 'detect-browser'

import { useFormConfig } from '../FormConfig'
import { validators, useFieldValidation } from '../utils'
import type { ValueType, IFormComponentProps } from '../FieldBase'

const { composeValidators, required: requiredValidator } = validators

export type FieldProps<TInputValue> = FinalFieldProps<
  TInputValue,
  FieldRenderProps<TInputValue, HTMLInputElement>,
  HTMLInputElement
> &
  TextLabelProps

export type Props<
  TWrappedComponentProps extends IFormComponentProps,
  TInputValue
> = TWrappedComponentProps &
  FieldProps<TInputValue> & {
    name: string
    type?: string
    label?: React.ReactNode
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

const isFirefox = detect()?.name === 'firefox'

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
    autoSaveIndicator,
    ...rest
  } = props

  const { validateOnSubmit: shouldValidateOnSubmit, highlightAutofill } =
    useFormConfig()
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
    value,
  })

  const error = useFieldValidation({
    name,
    meta,
    validators,
    shouldValidateOnSubmit,
  })

  const shouldHighlightAutofill =
    highlightAutofill && !meta.visited && meta.pristine && input.value

  const childProps: Record<string, unknown> = {
    id,
    status,
    ...rest,
    ...input,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (event: ChangeEvent<HTMLElement> | any) => {
      if (isFirefox && event?.target) {
        /**
         * The fix for autofill in Firefox, it's taken from:
         * https://github.com/facebook/react/issues/18986#issuecomment-636354428
         * https://github.com/facebook/react/issues/15739
         */
        Object.defineProperty(event.target, 'defaultValue', {
          configurable: true,
          get() {
            return defaultValue ?? ''
          },
          set() {},
        })
      }

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
    },
    ...(shouldHighlightAutofill ? { highlight: 'autofill' } : {}),
  }

  return (
    <PicassoForm.Field
      error={error}
      hint={hint}
      data-testid={dataTestId}
      fieldRequirements={renderFieldRequirements?.({
        value: input.value,
        error: status === 'error',
      })}
      autoSaveIndicator={autoSaveIndicator}
      hasMultilineCounter={meta.data?.hasMultilineCounter}
    >
      {label}
      {children(childProps)}
    </PicassoForm.Field>
  )
}

Field.defaultProps = {}

Field.displayName = 'Field'

export default Field
