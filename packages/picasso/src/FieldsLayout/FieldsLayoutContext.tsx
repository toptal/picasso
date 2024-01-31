import React, { createContext, useContext, useMemo } from 'react'

import { useBreakpoint } from '../utils'
import type { BreakpointKeys } from '../utils'

export type LabelSpacing = 2 | 3 | 4

export type ResponsiveLabelSpacing = {
  [k in BreakpointKeys]?: LabelSpacing
}

export type FieldsLayoutContextValue = {
  layout: 'horizontal' | 'vertical'
  labelWidth: LabelSpacing | ResponsiveLabelSpacing
}

const FieldsLayoutContext = createContext<FieldsLayoutContextValue>({
  layout: 'vertical',
  labelWidth: 3,
})

export type FieldsLayoutContextProviderProps = {
  layout?: 'horizontal' | 'vertical'
  labelWidth?: LabelSpacing | ResponsiveLabelSpacing
  children: React.ReactNode
}

export const FieldsLayoutContextProvider = ({
  layout = 'vertical',
  labelWidth = 3,
  children,
}: FieldsLayoutContextProviderProps) => {
  const isSmallScreen = useBreakpoint(['sm', 'xs'])

  const value = useMemo(
    () => ({
      layout: isSmallScreen ? 'vertical' : layout,
      labelWidth,
    }),
    [layout, isSmallScreen, labelWidth]
  )

  return (
    <FieldsLayoutContext.Provider value={value}>
      {children}
    </FieldsLayoutContext.Provider>
  )
}

export const useFieldsLayoutContext = () => useContext(FieldsLayoutContext)
