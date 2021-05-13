import { useCallback } from 'react'

import { ValueType, UseSelectProps } from '../../../types'
import { EMPTY_INPUT_VALUE } from '../../../utils'

const useClickHandler = <T extends ValueType, M extends boolean = false>({
  selectState: { isOpen, canOpen, open, close, setFilterOptionsValue }
}: UseSelectProps<T, M>) =>
  useCallback(() => {
    if (canOpen) {
      setFilterOptionsValue(EMPTY_INPUT_VALUE)
      open()
    } else if (isOpen) {
      close()
    }
  }, [isOpen, canOpen, open, close, setFilterOptionsValue])

export default useClickHandler
