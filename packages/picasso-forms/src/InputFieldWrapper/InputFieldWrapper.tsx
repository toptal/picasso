import React from 'react'
import { OutlinedInputStatus } from '@toptal/picasso'
import { FieldMetaState, useField } from 'react-final-form'

import FieldWrapper, {
  Props as FieldWrapperProps,
  ValueType
} from '../FieldWrapper'
import { FormConfigProps, useFormConfig } from '../FormConfig'

export const getInputStatus = <T extends ValueType>(
  meta: FieldMetaState<T>,
  formConfig: FormConfigProps
): OutlinedInputStatus | undefined => {
  if (formConfig.validateOnSubmit && meta.modifiedSinceLastSubmit) {
    return undefined
  }

  if (!meta.touched) {
    return undefined
  }

  if (meta.error) {
    return 'error'
  }

  if (meta.dirtySinceLastSubmit) {
    return undefined
  }

  if (meta.submitError) {
    return 'error'
  }

  return formConfig.showValidState ? 'success' : undefined
}

const InputFieldWrapper = <
  TWrappedComponentProps extends { value?: ValueType },
  TInputValue extends ValueType = TWrappedComponentProps['value']
>(
  props: FieldWrapperProps<TInputValue, TWrappedComponentProps>
) => {
  const { name } = props

  const { meta } = useField(name)
  const formConfig = useFormConfig()

  const status = getInputStatus<TInputValue>(meta, formConfig)

  return (
    <FieldWrapper<TWrappedComponentProps, TInputValue>
      {...props}
      status={status}
    />
  )
}

InputFieldWrapper.defaultProps = {}

InputFieldWrapper.displayName = 'InputFieldWrapper'

export default InputFieldWrapper
