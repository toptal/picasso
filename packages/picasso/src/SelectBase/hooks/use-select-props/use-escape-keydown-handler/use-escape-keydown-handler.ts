import type { KeyboardEvent } from 'react'
import { useCallback } from 'react'

import type { ValueType, UseSelectProps } from '../../../types'

const useEscapeKeyDownHandler = <
  T extends ValueType,
  M extends boolean = false
>({
  selectState: { close },
}: UseSelectProps<T, M>) =>
  useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault()
      close()
    },
    [close]
  )

export default useEscapeKeyDownHandler
