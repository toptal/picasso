import React from 'react'

export interface TabsContextValue<T> {
  value: T
  onChange: (event: React.ChangeEvent<{}>, value: T) => void
  orientation: 'horizontal' | 'vertical'
  variant: 'scrollable' | 'fullWidth'
  direction?: 'ltr' | 'rtl'
}

export const TabsContext = React.createContext<TabsContextValue<any>>({
  value: undefined,
  onChange: () => {},
  orientation: 'horizontal',
  variant: 'scrollable',
  direction: 'ltr',
})

export const useTabsContext = () => {
  const context = React.useContext(TabsContext)

  if (!context) {
    throw new Error('useTabsContext must be used within a TabsProvider')
  }

  return context
}
