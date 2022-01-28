import Quill, { SelectionChangeHandler } from 'quill'
import { useCallback, useState } from 'react'

import useOnSelectionChange from '../useOnSelectionChange'

type Props = {
  quill: Quill
}

const useHasFocus = ({ quill }: Props) => {
  const [hasFocus, setHasFocus] = useState<boolean>(false)

  const handleFocusChange: SelectionChangeHandler = useCallback(
    (_, __, source) => {
      const isSilentEvent = source === 'silent'

      if (isSilentEvent) {
        return
      }

      const hasCurrentFocus = quill.hasFocus()

      setHasFocus(hasCurrentFocus)
    },
    [quill]
  )

  useOnSelectionChange({ quill, handler: handleFocusChange })

  return { hasFocus }
}

export default useHasFocus
