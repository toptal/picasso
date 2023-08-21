import React, { createContext, useContext, useMemo } from 'react'

import { useBreakpoint } from '../utils'

export type FormContextValue = {
  appearance: 'horizontal' | 'vertical'
}

const FormContext = createContext<FormContextValue>({
  appearance: 'vertical',
})

export type FormContextProviderProps = {
  appearance?: 'horizontal' | 'vertical'
  children: React.ReactNode
}

export const FormContextProvider = ({
  appearance = 'vertical',
  children,
}: FormContextProviderProps) => {
  const isSmallScreen = useBreakpoint(['sm', 'xs'])

  const value = useMemo(
    () => ({
      appearance: isSmallScreen ? 'vertical' : appearance,
    }),
    [appearance, isSmallScreen]
  )

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export const useFormContext = () => useContext(FormContext)
