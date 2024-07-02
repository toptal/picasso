import React, { createContext, useContext, useMemo } from 'react'
import { useBreakpoint } from '@toptal/picasso-utils'
import type { BreakpointKeys } from '@toptal/picasso-utils'

export type LabelColumnSize = 2 | 3 | 4

export type ResponsiveLabelColumnSize = {
  [k in BreakpointKeys]?: LabelColumnSize
}

export type FieldLayout = 'horizontal' | 'vertical'

export type FieldsLayoutContextValue = {
  layout: FieldLayout
  labelWidth: LabelColumnSize | ResponsiveLabelColumnSize
}

export const DEFAULT_LABEL_WIDTH_SIZE: LabelColumnSize = 3

const FieldsLayoutContext = createContext<FieldsLayoutContextValue>({
  layout: 'vertical',
  labelWidth: DEFAULT_LABEL_WIDTH_SIZE,
})

export type FieldsLayoutContextProviderProps = {
  layout?: 'horizontal' | 'vertical'
  labelWidth?: LabelColumnSize | ResponsiveLabelColumnSize
  children: React.ReactNode
}

export const FieldsLayoutContextProvider = ({
  layout = 'vertical',
  labelWidth = DEFAULT_LABEL_WIDTH_SIZE,
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
