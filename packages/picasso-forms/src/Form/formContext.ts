import { createContext } from 'react'

import { FormValidationMode } from './Form'

export interface FormContextProps {
  validationMode: FormValidationMode
}

export default createContext<FormContextProps>({
  validationMode: 'onSubmit'
})
