/* eslint-disable import/no-extraneous-dependencies */
import React, { createContext, useContext, useMemo } from 'react'
import { useBreakpoint } from '@toptal/picasso-utils'

export type FieldsLayoutContextValue = {
  layout: 'horizontal' | 'vertical'
}

const FieldsLayoutContext = createContext<FieldsLayoutContextValue>({
  layout: 'vertical',
})

export type FieldsLayoutContextProviderProps = {
  layout?: 'horizontal' | 'vertical'
  children: React.ReactNode
}

export const FieldsLayoutContextProvider = ({
  layout = 'vertical',
  children,
}: FieldsLayoutContextProviderProps) => {
  const isSmallScreen = useBreakpoint(['sm', 'xs'])

  const value = useMemo(
    () => ({
      layout: isSmallScreen ? 'vertical' : layout,
    }),
    [layout, isSmallScreen]
  )

  return (
    <FieldsLayoutContext.Provider value={value}>
      {children}
    </FieldsLayoutContext.Provider>
  )
}

export const useFieldsLayoutContext = () => useContext(FieldsLayoutContext)
