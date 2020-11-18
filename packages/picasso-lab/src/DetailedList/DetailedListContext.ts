import React from 'react'

interface ContextValue {
  striped?: boolean
  size: number
}

export const DetailedListContext = React.createContext<ContextValue | null>(
  null
)
