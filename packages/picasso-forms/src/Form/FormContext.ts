import { createContext, useContext, RefObject, createRef } from 'react'
import { FieldValidator } from 'final-form'

export type Validators = Record<string, FieldValidator<unknown>>

export type FormContextProps = {
  getValidators: () => Validators
  setValidators: (fieldName: string, validator: FieldValidator<unknown>) => void
  clearValidators: (fieldName: string) => void
}

export const createFormContext = (): FormContextProps => {
  const validators: Validators = {}

  return {
    getValidators: () => validators,
    setValidators: (fieldName, validator) => {
      validators[fieldName] = validator
    },
    clearValidators: fieldName => {
      delete validators[fieldName]
    }
  }
}

const defaultRef = createRef<FormContextProps>()

export const FormContext = createContext<RefObject<FormContextProps>>(
  defaultRef
)

export const useFormContext = () => useContext(FormContext)
