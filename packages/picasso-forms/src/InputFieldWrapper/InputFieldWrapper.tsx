import React from 'react'
import { OutlinedInputStatus } from '@toptal/picasso'
import { FieldMetaState, useField } from 'react-final-form'

import FieldWrapper, {
  Props as FieldWrapperProps,
  ValueType
} from '../FieldWrapper'
import { FormConfigProps, useFormConfig } from '../FormConfig'
import { FormInputProps } from '../Input'

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

  if (meta.dirtySinceLastSubmit) {
    return 'default'
  }

  if (meta.submitError) {
    return 'error'
  }

  return formConfig.showValidState ? 'success' : 'default'
}

const InputFieldWrapper = <
  TFormInputProps extends {},
  TValue extends string | undefined
>(
  props: FieldWrapperProps<TValue, TFormInputProps>
) => {
  const { name } = props

  const { meta } = useField(name)
  const formConfig = useFormConfig()

  const status = getInputStatus<TValue>(meta, formConfig)

  return <FieldWrapper<FormInputProps, TValue> {...props} status={status} />
}

InputFieldWrapper.defaultProps = {}

InputFieldWrapper.displayName = 'InputFieldWrapper'

export default InputFieldWrapper
