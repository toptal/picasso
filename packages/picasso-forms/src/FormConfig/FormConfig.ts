import { createContext, useContext } from 'react'

export type RequiredVariant = 'asterisk' | 'optional'
export interface FormConfigProps {
  validateOnSubmit?: boolean
  requiredVariant?: RequiredVariant
}

export const FormConfigContext = createContext<FormConfigProps>({})

export const useFormConfig = () => useContext(FormConfigContext)
