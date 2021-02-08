import { useCallback } from 'react'

import { ValueType, UseSelectProps } from '../../../types'
import { EMPTY_INPUT_VALUE } from '../../../utils'

const useFocusHandler = <T extends ValueType, M extends boolean = false>({
  selectState: { isOpen, setFilterOptionsValue }
}: UseSelectProps<T, M>) =>
  useCallback(() => {
    if (!isOpen) {
      setFilterOptionsValue(EMPTY_INPUT_VALUE)
    }
  }, [isOpen, setFilterOptionsValue])

export default useFocusHandler
