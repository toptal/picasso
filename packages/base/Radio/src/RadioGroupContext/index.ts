import type { ChangeEvent } from 'react'
import { createContext, useContext } from 'react'

export interface RadioGroupContextValue {
  name?: string
  value?: string | number | boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(
  null
)

export const useRadioGroupContext = () => useContext(RadioGroupContext)
