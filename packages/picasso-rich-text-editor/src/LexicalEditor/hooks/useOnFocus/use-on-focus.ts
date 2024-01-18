import { useCallback, useState } from 'react'
import { noop } from '@toptal/picasso-utils'

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

const useOnFocus = ({
  onFocus = noop,
  onBlur = noop,
  internalRefs = [],
}: Props): Result => {
  const [focused, setFocused] = useState(false)

  const handleFocus = useCallback(() => {
    setFocused(true)
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
