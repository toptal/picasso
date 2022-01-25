import { SelectionChangeHandler } from 'quill'
import { useMemo, useState } from 'react'

import { EditorRefType } from '../../types'
import useSelectionChange from '../useSelectionChange'

type Props = {
  ref: EditorRefType
}

export const getHandler: (
  ref: EditorRefType,
  setHasFocus: (hasFocus: boolean) => void
) => SelectionChangeHandler = (ref, setHasFocus) => (_, __, source) => {
  const quill = ref.current

  if (!quill || source === 'silent') {
    return
  }

  const hasQuillFocus = quill.hasFocus()

  setHasFocus(hasQuillFocus)
}

const useHasFocus = ({ ref }: Props) => {
  const [hasFocus, setHasFocus] = useState<boolean>(false)

  const handler = useMemo(() => getHandler(ref, setHasFocus), [
    ref,
    setHasFocus
  ])

  useSelectionChange({ ref, handler })

  return { hasFocus }
}

export default useHasFocus
