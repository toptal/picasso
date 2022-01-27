import Quill, { SelectionChangeHandler } from 'quill'
import { useMemo, useState } from 'react'

import useSelectionChange from '../useSelectionChange'

type Props = {
  quill: Quill | undefined
}

type GetHandlerType = (
  quill: Quill | undefined,
  setHasFocus: (hasFocus: boolean) => void
) => SelectionChangeHandler

export const getSelectionChangeHandler: GetHandlerType = (
  quill,
  setHasFocus
) => (_, __, source) => {
  const ignoreEventWhenSilent = source === 'silent'

  if (ignoreEventWhenSilent || !quill) {
    return
  }

  const hasCurrentFocus = quill.hasFocus()

  setHasFocus(hasCurrentFocus)
}

const useHasFocus = ({ quill }: Props) => {
  const [hasFocus, setHasFocus] = useState<boolean>(false)

  const handleSelectionChange = useMemo(
    () => getSelectionChangeHandler(quill, setHasFocus),
    [quill]
  )

  useSelectionChange({ quill, handler: handleSelectionChange })

  return { hasFocus }
}

export default useHasFocus
