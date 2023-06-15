import { useCallback, useState } from 'react'

import noop from '../../../utils/noop'

export type Props = {
  internalRefs?: React.RefObject<HTMLDivElement>[]
  onFocus?: () => void
  onBlur?: () => void
}

type Result = {
  isFocused: boolean
  handleFocus: (e: React.FocusEvent<HTMLDivElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLDivElement>) => void
}

const useOnFocus = ({
  onFocus = noop,
  onBlur = noop,
  internalRefs = [],
}: Props): Result => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = useCallback(() => {
    setIsFocused(true)
    onFocus()
  }, [onFocus])

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      const focusElement = e.relatedTarget as Node
      const isInternalElement = internalRefs.some(
        ref => ref.current && ref.current.contains(focusElement)
      )

      if (isInternalElement) {
        return
      }

      setIsFocused(false)
      onBlur()
    },
    [onBlur]
  )

  return {
    isFocused,
    handleFocus,
    handleBlur,
  }
}

export default useOnFocus
