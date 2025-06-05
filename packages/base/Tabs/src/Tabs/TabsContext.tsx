import React from 'react'

export type TabsValueType = string | number | null

export interface TabsContextValue {
  value: TabsValueType
  onChange: (event: React.ChangeEvent<{}>, value: TabsValueType) => void
  orientation: 'horizontal' | 'vertical'
  variant: 'scrollable' | 'fullWidth'
}

export const TabsContext = React.createContext<TabsContextValue>({
  value: null,
  onChange: () => {},
  orientation: 'horizontal',
  variant: 'scrollable',
})

export const useTabsContext = () => {
  const context = React.useContext(TabsContext)

  if (!context) {
    throw new Error('useTabsContext must be used within a TabsProvider')
  }

  return context
}
