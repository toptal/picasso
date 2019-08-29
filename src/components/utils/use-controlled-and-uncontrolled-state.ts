import { useState, useCallback } from 'react'

const useControlledAndUncontrolledState = <T>(
  defaultValue: T | null | undefined,
  value: T | null | undefined,
  onChange: (newValue: T | null) => void
): [T | null, (newValue: T | null) => void] => {
  const [internalValue, setInternalValue] = useState<T | null>(
    defaultValue !== undefined ? defaultValue : null
  )
  const actualValue = value !== undefined ? value : internalValue

  const setActualValue = useCallback((newValue: T | null) => {
    setInternalValue(newValue)
    onChange(newValue)
  }, [onChange])

  return [actualValue, setActualValue]
}

export default useControlledAndUncontrolledState
