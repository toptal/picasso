import Quill from 'quill'
import { useEffect, useRef } from 'react'

const useDisabledEditor = ({
  disabled,
  quill
}: {
  disabled?: boolean
  quill?: Quill
}) => {
  // new instance of quill is by default created enabled
  // we don't want to call quill.enable(true) when
  // not necessary on first render
  const initialDisable = useRef<boolean | undefined>(false)

  useEffect(() => {
    if (!quill) {
      return
    }

    if (initialDisable.current !== Boolean(disabled)) {
      initialDisable.current = disabled
      quill.enable(!disabled)
    }
  }, [disabled, quill])
}

export default useDisabledEditor
