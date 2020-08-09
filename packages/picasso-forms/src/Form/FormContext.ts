import { createContext, useContext, RefObject, createRef } from 'react'
import { FieldValidator } from 'final-form'

export type FormContextProps = {
  [key: string]: FieldValidator<unknown>
}

const defaultRef = createRef<FormContextProps>()

export const FormContext = createContext<RefObject<FormContextProps>>(
  defaultRef
)

export const useFormContext = () => useContext(FormContext)
