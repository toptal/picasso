import type { AnyObject } from 'final-form'
import { useCallback, useMemo, useState } from 'react'
import debounce from 'debounce'

import type { ChangedFields } from '../form-values-change-decorator'
import createFormValuesChangeDecorator from '../form-values-change-decorator'

interface Props<T extends AnyObject> {
  subscribedFields?: (keyof T)[]
  onFormValuesChange: (changedFields: ChangedFields<T>, values: T) => void
  debounceDelay?: number
}

const useFormAutoSave = <T extends AnyObject>(props: Props<T>) => {
  const [savingFields, setSavingFields] = useState<
    ChangedFields<T> | undefined
  >()

  const {
    onFormValuesChange,
    subscribedFields,
    debounceDelay: delay = 1000,
  } = props

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleValueChange = useCallback(
    debounce(async (changedValues: ChangedFields<T>, debouncedValues: T) => {
      await onFormValuesChange(changedValues, debouncedValues)

      setSavingFields(undefined)
    }, delay),
    [delay, onFormValuesChange]
  )

  const handleFormValuesChange = useCallback(
    (changedFields: ChangedFields<T>, values: T) => {
      setSavingFields(changedFields)

      handleValueChange(changedFields, values)
    },
    [handleValueChange]
  )

  const autoSaveDecorator = useMemo(
    () =>
      createFormValuesChangeDecorator({
        subscribedFields,
        onChange: handleFormValuesChange,
      }),
    [handleFormValuesChange, subscribedFields]
  )

  return {
    savingFields,
    autoSaveDecorator,
  }
}

export default useFormAutoSave
