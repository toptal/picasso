import { createContext } from 'react'

export type ButtonGroupOrder = 'first' | 'middle' | 'last' | undefined

export default createContext<ButtonGroupOrder>(undefined)
