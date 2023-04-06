import { useCallback } from 'react'
import type { FieldInputProps } from 'react-final-form'

export type Props<TInputValue> = {
  input: FieldInputProps<TInputValue, HTMLInputElement>
  enableReset: boolean
  onResetClick?: (callback: (resetValue: string) => void) => void
}

const defaultOnResetClick = (callback: (resetValue: string) => void) => {
  callback('')
}

const useFormInputReset = <TInputValue>({
  input,
  enableReset,
  onResetClick = defaultOnResetClick,
}: Props<TInputValue>): (() => void) | undefined => {
  const resetClickHandler = useCallback(() => {
    onResetClick!((resetValue: string) => {
      input.onChange(resetValue)
    })
  }, [input, onResetClick])

  if (!enableReset) {
    return
  }

  return resetClickHandler
}

export default useFormInputReset
