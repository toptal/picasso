import { useCallback, useRef, useState } from 'react'
import { noop } from '@toptal/picasso-utils'

// Plugin dialogs render in a portal outside the editor, but moving focus into
// one is still part of editing, so it must not blur the editor
export const INTERNAL_DIALOG_ATTRIBUTE = 'data-rte-dialog'

export type Props = {
  internalRefs?: React.RefObject<HTMLDivElement>[]
  onFocus?: () => void
  onBlur?: () => void
}

type Result = {
  focused: boolean
  handleFocus: (e: React.FocusEvent<HTMLDivElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLDivElement>) => void
}

const isInternalElement = (
  e: React.FocusEvent<HTMLDivElement>,
  internalRefs: React.RefObject<HTMLDivElement>[]
) => {
  const focusElement = e.relatedTarget as Node | null

  if (!focusElement) {
    return false
  }

  return (
    Boolean(e.currentTarget?.contains(focusElement)) ||
    internalRefs.some(ref => ref.current?.contains(focusElement)) ||
    (focusElement instanceof Element &&
      Boolean(focusElement.closest(`[${INTERNAL_DIALOG_ATTRIBUTE}]`)))
  )
}

const useOnFocus = ({
  onFocus = noop,
  onBlur = noop,
  internalRefs = [],
}: Props): Result => {
  const [focused, setFocused] = useState(false)
  // Focus coming back from the toolbar or a dialog is not a new focus
  const focusedRef = useRef(false)

  const handleFocus = useCallback(() => {
    if (focusedRef.current) {
      return
    }

    focusedRef.current = true
    setFocused(true)
    onFocus()
  }, [onFocus])

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (isInternalElement(e, internalRefs)) {
        return
      }

      focusedRef.current = false
      setFocused(false)
      onBlur()
    },
    [onBlur]
  )

  return {
    focused,
    handleFocus,
    handleBlur,
  }
}

export default useOnFocus
