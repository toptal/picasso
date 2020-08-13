import { createContext, useContext } from 'react'

export interface FormConfigProps {
  validateOnSubmit?: boolean
}

export const FormConfigContext = createContext<FormConfigProps>({})

export const useFormConfig = () => useContext(FormConfigContext)
