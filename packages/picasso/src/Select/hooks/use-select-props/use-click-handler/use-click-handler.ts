import { useCallback } from 'react'

import { ValueType, UseSelectProps } from '../../../types'
import { EMPTY_INPUT_VALUE } from '../../../utils'

const useClickHandler = <T extends ValueType, M extends boolean = false>({
  selectState: { canOpen, open, setFilterOptionsValue }
}: UseSelectProps<T, M>) =>
  useCallback(() => {
    if (canOpen) {
      setFilterOptionsValue(EMPTY_INPUT_VALUE)
      open()
    }
  }, [canOpen, open, setFilterOptionsValue])

export default useClickHandler
