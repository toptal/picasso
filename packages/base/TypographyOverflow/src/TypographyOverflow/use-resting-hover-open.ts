import type { MouseEvent, RefObject } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import type { DelayType } from '@toptal/picasso-tooltip'

// Same as the Tooltip's delays
const OPEN_DELAYS: Record<DelayType, number> = { short: 200, long: 500 }

const noop = () => {}

const contains = (
  ref: RefObject<HTMLElement | null>,
  target: EventTarget | null
) => target instanceof Node && Boolean(ref.current?.contains(target))

// Hovering remounts the text inside the tooltip anchor, and the tooltip opens
// on a pointer move over it, which a resting pointer never makes. The browser
// may also never mark the new text hovered when the pointer moves on quickly,
// so the text gets no mouseleave and the tooltip never closes: the hover also
// ends when the pointer is over anything else
export const useRestingHoverOpen = ({
  delay = 'short',
  onOpen,
  onClose,
  onMouseLeave,
}: {
  delay?: DelayType
  onOpen: () => void
  onClose: () => void
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void
}) => {
  const anchorRef = useRef<HTMLElement>(null)
  // The pointer may move into an interactive tooltip
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const isHoveredRef = useRef(false)
  // A close while hovered (e.g. with Escape) holds until the pointer leaves
  const isDismissedRef = useRef(false)
  const stopWatchingRef = useRef(noop)

  const endHover = useCallback(() => {
    isHoveredRef.current = false
    isDismissedRef.current = false
    clearTimeout(timerRef.current)
    stopWatchingRef.current()
  }, [])

  useEffect(() => endHover, [endHover])

  const watchPointer = useCallback(() => {
    const doc = anchorRef.current?.ownerDocument ?? document

    const handleMouseOver = (event: Event) => {
      if (
        !contains(anchorRef, event.target) &&
        !contains(tooltipRef, event.target)
      ) {
        endHover()
        onClose()
      }
    }

    stopWatchingRef.current()
    doc.addEventListener('mouseover', handleMouseOver, true)
    stopWatchingRef.current = () => {
      doc.removeEventListener('mouseover', handleMouseOver, true)
      stopWatchingRef.current = noop
    }
  }, [endHover, onClose])

  const handleEnter = useCallback(
    (canOpen: boolean) => {
      isHoveredRef.current = true

      if (!canOpen) {
        return
      }

      watchPointer()

      if (!isDismissedRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(onOpen, OPEN_DELAYS[delay])
      }
    },
    [delay, onOpen, watchPointer]
  )

  const handleMouseLeave = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      endHover()
      onMouseLeave?.(event)
    },
    [endHover, onMouseLeave]
  )

  const handleClose = useCallback(() => {
    isDismissedRef.current = isHoveredRef.current
    clearTimeout(timerRef.current)
    onClose()
  }, [onClose])

  return { anchorRef, tooltipRef, handleEnter, handleMouseLeave, handleClose }
}
