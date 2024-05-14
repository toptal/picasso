import React from 'react'
import type { Status as OutlinedInputStatus } from '@toptal/picasso-outlined-input'
import type { FieldMetaState } from 'react-final-form'
import { useField } from 'react-final-form'

import type { Props as FieldProps } from '../Field'
import Field from '../Field'
import type { ValueType, IFormComponentProps } from '../FieldBase'
import type { FormConfigProps } from '../FormConfig'
import { useFormConfig } from '../FormConfig'
import useFormInputReset from '../utils/use-form-input-reset'

export const getInputStatus = <T extends ValueType>(
  meta: FieldMetaState<T>,
  formConfig: FormConfigProps
): OutlinedInputStatus => {
  if (formConfig.validateOnSubmit && meta.modifiedSinceLastSubmit) {
    return 'default'
  }

  if (!meta.touched) {
    return 'default'
  }

  if (meta.error) {
    return 'error'
  }

  if (!meta.dirtySinceLastSubmit && meta.submitError) {
    return 'error'
  }

  return formConfig.showValidState ? 'success' : 'default'
}

const InputField = <
  TWrappedComponentProps extends IFormComponentProps,
  TInputValue extends ValueType = TWrappedComponentProps['value']
>(
  props: FieldProps<TWrappedComponentProps, TInputValue>
) => {
  const { name, children, enableReset, onResetClick, ...rest } = props

  const { meta, input } = useField<TInputValue, HTMLInputElement>(name)
  const formConfig = useFormConfig()

  const status = getInputStatus<TInputValue>(meta, formConfig)
  const onFormInputResetClick = useFormInputReset<TInputValue>({
    input,
    enableReset,
    onResetClick,
  })

  return (
    <Field<IFormComponentProps, TInputValue>
      status={status}
      name={name}
      onResetClick={onFormInputResetClick}
      enableReset={enableReset}
      {...rest}
    >
      {children}
    </Field>
  )
}

InputField.defaultProps = {}

InputField.displayName = 'InputField'

export default InputField
