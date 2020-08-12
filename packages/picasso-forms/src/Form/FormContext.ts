import { createContext, useContext, MutableRefObject } from 'react'
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

export const FormContext = createContext<MutableRefObject<
  FormContextProps
> | null>(null)

export const useFormContext = () => {
  const context = useContext(FormContext)

  if (!context) {
    throw new Error('Form Field cannot be rendered outside Form component')
  }

  return context.current
}
