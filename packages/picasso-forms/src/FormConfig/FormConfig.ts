import { createContext, useContext } from 'react'

export type RequiredVariant = 'default' | 'asterisk'

type ValidationOnSubmitConfig = {
  showValidState?: false
  validateOnSubmit?: true
}

type ShowValidStateConfig = {
  showValidState?: true
  validateOnSubmit?: false
}

type NoValidationConfig = {
  showValidState?: false
  validateOnSubmit?: false
}

// reason for different types is that we want to deny the user to set both showValidState and validateOnSubmit to true
export type FormConfigProps = (
  | ValidationOnSubmitConfig
  | ShowValidStateConfig
  | NoValidationConfig
) & {
  requiredVariant?: RequiredVariant
  highlightAutofill?: boolean
}

export const FormConfigContext = createContext<FormConfigProps>({
  highlightAutofill: false,
})
export const FormConfigProvider = FormConfigContext.Provider

export const useFormConfig = () => useContext(FormConfigContext)
