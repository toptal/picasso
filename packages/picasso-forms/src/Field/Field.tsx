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
import { assertFieldName } from './assert-field-name'
import {
  useClaimedFieldState,
  useReleaseClaimedFieldState,
} from './use-claimed-field-state'

const { composeValidators, required: requiredValidator } = validators

export type FieldProps<TInputValue> = FinalFieldProps<
  TInputValue,
  FieldRenderProps<TInputValue, HTMLInputElement>,
  HTMLInputElement
> &
  TextLabelProps

// The wrapped component's `children?: ReactNode` must not meet the render-prop
// `children` below: @types/react 19 no longer lets a function pass as a
// ReactNode. Distributive, so union props keep their variants.
type WithoutChildren<T> = T extends unknown ? Omit<T, 'children'> : never

export type Props<
  TWrappedComponentProps extends IFormComponentProps,
  TInputValue
> = WithoutChildren<TWrappedComponentProps> &
  Omit<FieldProps<TInputValue>, 'children'> & {
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

  assertFieldName(name)

  // Brackets `useField` below; remove both calls with the rest of the
  // react-final-form 7.0.1 workaround (see the module)
  const releaseClaimedFieldState = useClaimedFieldState(name, {
    afterSubmit,
    beforeSubmit,
    data,
    format,
    formatOnBlur,
    validateFields,
  })

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

  useReleaseClaimedFieldState(releaseClaimedFieldState)

  const error = useFieldValidation({
    name,
    meta,
    validators,
    shouldValidateOnSubmit,
  })

  const shouldHighlightAutofill =
    highlightAutofill && !meta.visited && meta.pristine && input.value

  // `react-final-form@7.0.1` derives a checkbox's `checked` from `parse(value)`,
  // where 6 and 7.0.0 used `format(value)`; upstream changed it on purpose
  // (final-form/react-final-form#1074) for group values whose `parse` fixes
  // their type. For a standalone checkbox `parse` is the wrong direction: the
  // string-boolean pair `format={value => value === 'true'}` with
  // `parse={checked => (checked ? 'true' : 'false')}` reads a stored `'false'`
  // through `parse`, gets the truthy `'true'` back and renders an unchecked box
  // as checked; clicking it then submits the wrong value. For a checkbox
  // without its own `value` the field's `input.value` is already
  // `format(value)`, so this restores the 6.x meaning: a deliberate divergence,
  // kept until upstream settles that case. A checkbox that carries a `value`
  // belongs to a group, where `checked` is array membership and upstream's
  // semantics stand.
  // TODO: [PF-2262] link the upstream issue for the string-boolean checkbox
  // once it is filed; drop this block if a release derives `checked` from
  // `format` again for a value-less checkbox
  const shouldDeriveCheckedFromFormat =
    type === 'checkbox' && value === undefined && format !== undefined

  const childProps: Record<string, unknown> = {
    id,
    status,
    ...rest,
    ...input,
    ...(shouldDeriveCheckedFromFormat ? { checked: Boolean(input.value) } : {}),
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

Field.displayName = 'Field'

export default Field
