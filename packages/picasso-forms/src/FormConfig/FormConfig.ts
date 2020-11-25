import { createContext, useContext } from 'react'
import { RequiredVariant } from '@toptal/picasso'

export interface FormConfigProps {
  validateOnSubmit?: boolean
  requiredVariant?: RequiredVariant
}

export const FormConfigContext = createContext<FormConfigProps>({})

export const useFormConfig = () => useContext(FormConfigContext)
