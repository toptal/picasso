import { useEffect, useRef } from 'react'

import { EditorRefType } from '../types'

const useDisabledEditor = ({
  disabled,
  ref
}: {
  disabled?: boolean
  ref: EditorRefType
}) => {
  // new instance of quill is by default created enabled
  // we don't want to call quill.enable(true) when
  // not necessary on first render
  const initialDisable = useRef<boolean>(false)

  useEffect(() => {
    const quill = ref.current

    if (quill && initialDisable.current !== Boolean(disabled)) {
      initialDisable.current = disabled
      quill.enable(!disabled)
    }
  }, [disabled, ref])
}

export default useDisabledEditor
