import { useCallback } from 'react'
import { FieldInputProps } from 'react-final-form'

export type Props<TInputValue> = {
  input: FieldInputProps<TInputValue, HTMLInputElement>
  enableReset: boolean
  onResetClick?: (callback: (resetValue: string) => void) => void
}

const useFormInputReset = <TInputValue>({
  input,
  enableReset,
  onResetClick
}: Props<TInputValue>) => {
  const defaultResetClickHandler = useCallback(() => {
    input.onChange('')
  }, [input])

  const resetClickHandler = useCallback(() => {
    onResetClick!((resetValue: string) => {
      input.onChange(resetValue)
    })
  }, [input, onResetClick])

  if (!enableReset) {
    return
  }

  return onResetClick ? resetClickHandler : defaultResetClickHandler
}

export default useFormInputReset
