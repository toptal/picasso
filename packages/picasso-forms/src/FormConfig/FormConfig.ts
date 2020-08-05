import { createContext, useContext } from 'react'

export interface FormConfigProps {
  validateAfterFirstSubmit?: boolean
}

export const FormConfigContext = createContext<FormConfigProps>({})

export const useFormConfig = () => useContext(FormConfigContext)
