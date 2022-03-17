import React from 'react'
import { OutlinedInputStatus } from '@toptal/picasso'
import { FieldMetaState, useField } from 'react-final-form'

import FieldWrapper, {
  Props as FieldWrapperProps,
  ValueType,
  IFormComponentProps
} from '../FieldWrapper'
import { FormConfigProps, useFormConfig } from '../FormConfig'

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
  TWrappedComponentProps extends IFormComponentProps,
  TInputValue extends ValueType = TWrappedComponentProps['value']
>(
  props: FieldWrapperProps<TWrappedComponentProps, TInputValue>
) => {
  const { name } = props

  const { meta } = useField(name)
  const formConfig = useFormConfig()

  const status = getInputStatus<TInputValue>(meta, formConfig)

  return (
    <FieldWrapper<IFormComponentProps, TInputValue>
      status={status}
      {...props}
    />
  )
}

InputFieldWrapper.defaultProps = {}

InputFieldWrapper.displayName = 'InputFieldWrapper'

export default InputFieldWrapper
