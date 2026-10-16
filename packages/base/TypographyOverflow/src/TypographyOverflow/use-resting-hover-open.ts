import type { MouseEvent } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import type { DelayType } from '@toptal/picasso-tooltip'

// Same as the Tooltip's delays
const OPEN_DELAYS: Record<DelayType, number> = { short: 200, long: 500 }

// Hovering remounts the text inside the tooltip anchor, and the tooltip opens
// on a pointer move over it, which a resting pointer never makes
export const useRestingHoverOpen = ({
  delay = 'short',
  onOpen,
  onMouseLeave,
}: {
  delay?: DelayType
  onOpen: () => void
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void
}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const isHoveredRef = useRef(false)
  // A close while hovered (e.g. with Escape) holds until the pointer leaves
  const isDismissedRef = useRef(false)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const handleEnter = useCallback(
    (canOpen: boolean) => {
      isHoveredRef.current = true

      if (canOpen && !isDismissedRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(onOpen, OPEN_DELAYS[delay])
      }
    },
    [delay, onOpen]
  )

  const handleMouseLeave = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      isHoveredRef.current = false
      isDismissedRef.current = false
      clearTimeout(timerRef.current)
      onMouseLeave?.(event)
    },
    [onMouseLeave]
  )

  const handleClose = useCallback(() => {
    isDismissedRef.current = isHoveredRef.current
    clearTimeout(timerRef.current)
  }, [])

  return { handleEnter, handleMouseLeave, handleClose }
}
