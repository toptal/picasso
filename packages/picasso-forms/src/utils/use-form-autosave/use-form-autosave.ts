import { debounce } from 'debounce'
import { useCallback, useState } from 'react'

interface Props<T> {
  debounceDelay?: number
  onValueChange: (values?: T) => Promise<void>
  subscribedValues?: (keyof T)[]
}

const useFormAutoSave = <T>(props: Props<T>) => {
  const { debounceDelay: delay = 1000, onValueChange } = props

  const [saving, setSaving] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleValueChange = useCallback(
    debounce(async (debouncedValues: T) => {
      await onValueChange(debouncedValues)

      setSaving(false)
    }, delay),
    [delay, onValueChange]
  )

  const onFieldValueChange = useCallback(
    (values: T) => {
      setSaving(true)

      handleValueChange(values)
    },
    [handleValueChange]
  )

  return { saving, onFieldValueChange }
}

export default useFormAutoSave
