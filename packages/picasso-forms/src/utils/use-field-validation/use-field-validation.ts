import { useEffect } from 'react'
import { FieldValidator } from 'final-form'
import { FieldMetaState } from 'react-final-form'

import { ValueType } from '../../FieldWrapper'
import { useFormContext } from '../../Form/FormContext'

export type Props<T extends ValueType> = {
  name: string
  meta: FieldMetaState<T>
  validators: FieldValidator<T>
  shouldValidateOnSubmit?: boolean
}

export const getFieldError = <T extends ValueType>(
  meta: FieldMetaState<T>,
  shouldValidateOnSubmit?: boolean
) => {
  if (shouldValidateOnSubmit && meta.modifiedSinceLastSubmit) {
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

const useFieldValidation = <T extends ValueType>({
  name,
  meta,
  validators,
  shouldValidateOnSubmit
}: Props<T>) => {
  const { setValidators, clearValidators } = useFormContext()

  useEffect(() => {
    if (shouldValidateOnSubmit) {
      setValidators(name, validators)
    }

    return () => {
      clearValidators(name)
    }
  }, [setValidators, clearValidators, validators, shouldValidateOnSubmit, name])

  return getFieldError(meta, shouldValidateOnSubmit)
}

export default useFieldValidation
