import { createContext, useContext } from 'react'

export type ButtonGroupOrder = 'first' | 'middle' | 'last' | undefined

const ButtonGroupOrderContext = createContext<ButtonGroupOrder>(undefined)

export const useButtonGroupOrder = () => useContext(ButtonGroupOrderContext)

export default ButtonGroupOrderContext
