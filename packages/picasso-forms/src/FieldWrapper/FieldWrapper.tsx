import React, { ChangeEvent, FocusEvent, useCallback, useEffect } from 'react'
import {
  useField,
  FieldProps as FinalFieldProps,
  FieldMetaState,
  FieldRenderProps
} from 'react-final-form'
import {
  Form as PicassoForm,
  RequiredDecoration,
  DateOrDateRangeType
} from '@toptal/picasso'
import { Item } from '@toptal/picasso/Autocomplete'
import { FileUpload } from '@toptal/picasso/FileInput'
import { TextLabelProps } from '@toptal/picasso-shared'

import { useFormContext } from '../Form/FormContext'
import { useFormConfig, FormConfigProps, RequiredVariant } from '../FormConfig'
import { validators } from '../utils'

const { composeValidators, required: requiredValidator } = validators

type ValueType =
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

export type Props<
  TInputValue,
  TWrappedComponentProps
> = TWrappedComponentProps &
  FieldProps<TInputValue> &
  TextLabelProps & {
    name: string
    type?: string
    hideFieldLabel?: boolean
    hideLabelRequiredDecoration?: boolean
    fieldType?: string
    children: (props: any) => React.ReactNode
    renderFieldRequirements?: (props: {
      value?: TInputValue
      error?: boolean
    }) => React.ReactNode
  }

type FieldMeta<T> = FieldMetaState<T> & {
  dirtyAfterBlur?: boolean
}

const getInputError = <T extends ValueType>(
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
  label
}: {
  hideFieldLabel?: boolean
  error: string
  label: string
}) => {
  if (hideFieldLabel) {
    return {
      label
    }
  }

  return {
    error: Boolean(error)
  }
}

const getRequiredDecoration = (
  hideLabelRequiredDecoration?: boolean,
  required?: boolean,
  requiredVariant?: RequiredVariant
): RequiredDecoration | undefined => {
  if (hideLabelRequiredDecoration) {
    return
  }

  const showAsterisk = required && requiredVariant === 'asterisk'

  if (showAsterisk) {
    return 'asterisk'
  }

  const showOptional =
    !required && (!requiredVariant || requiredVariant === 'default')

  if (showOptional) {
    return 'optional'
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
    hideLabelRequiredDecoration,
    hint,
    label,
    required,
    enableReset,
    onResetClick,
    'data-testid': dataTestId,
    renderFieldRequirements,
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
    titleCase,
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

  const defaultResetClickHandler = useCallback(() => {
    input.onChange('')
  }, [input])

  const resetClickHandler = useCallback(() => {
    onResetClick((resetValue: string) => {
      input.onChange(resetValue)
    })
  }, [input, onResetClick])

  const error = getInputError<TInputValue>(meta, formConfig)

  const childProps: Record<string, unknown> = {
    id,
    ...rest,
    ...input,
    ...getProps({ hideFieldLabel, error, label }),
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

  if (enableReset) {
    childProps.onResetClick = onResetClick
      ? resetClickHandler
      : defaultResetClickHandler
    childProps.enableReset = enableReset
  }

  const requiredDecoration = getRequiredDecoration(
    hideLabelRequiredDecoration,
    required,
    formConfig.requiredVariant
  )

  return (
    <PicassoForm.Field
      error={error}
      hint={hint}
      data-testid={dataTestId}
      fieldRequirements={renderFieldRequirements?.({
        value: input.value,
        error: error
      })}
    >
      {!hideFieldLabel && label && (
        <PicassoForm.Label
          requiredDecoration={requiredDecoration}
          htmlFor={id}
          titleCase={titleCase}
        >
          {label}
        </PicassoForm.Label>
      )}
      {children(childProps)}
    </PicassoForm.Field>
  )
}

FieldWrapper.defaultProps = {}

FieldWrapper.displayName = 'FieldWrapper'

export default FieldWrapper
