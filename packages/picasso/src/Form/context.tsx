import React, { createContext, useContext, useMemo } from 'react'

import { useBreakpoint } from '../utils'

export type FormContextValue = {
  horizontal: boolean
}

const FormContext = createContext<FormContextValue>({
  horizontal: false,
})

export type FormContextProviderProps = {
  horizontal?: boolean
  children: React.ReactNode
}

export const FormContextProvider = ({
  horizontal,
  children,
}: FormContextProviderProps) => {
  const isSmallScreen = useBreakpoint(['sm', 'xs'])

  const value = useMemo(
    () => ({
      horizontal: !!horizontal && !isSmallScreen,
    }),
    [horizontal, isSmallScreen]
  )

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export const useFormContext = () => useContext(FormContext)
