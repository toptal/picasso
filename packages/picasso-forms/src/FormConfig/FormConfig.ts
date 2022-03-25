import { createContext, useContext } from 'react'

export type RequiredVariant = 'default' | 'asterisk'

export interface FormConfigProps {
  validateOnSubmit?: boolean
  requiredVariant?: RequiredVariant
  showValidState?: boolean
}

export const FormConfigContext = createContext<FormConfigProps>({})

export const useFormConfig = () => useContext(FormConfigContext)
