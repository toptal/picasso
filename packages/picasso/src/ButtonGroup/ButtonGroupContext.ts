import { createContext } from 'react'

export type ButtonGroupOrder = 'first' | 'middle' | 'last' | 'single'

export default createContext<ButtonGroupOrder | undefined>(undefined)
