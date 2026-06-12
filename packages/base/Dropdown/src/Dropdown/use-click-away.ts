import type { RefObject } from 'react'
import { useEffect } from 'react'

type ClickAwayHandler = (event: MouseEvent | TouchEvent) => void

/**
 * Invokes `onClickAway` on a click or touch outside the referenced element.
 * Replaces the legacy MUI ClickAwayListener for the Dropdown's portalled
 * content. Listeners are attached only while `enabled` is true so a closed
 * dropdown keeps no document-level handlers.
 */
export const useClickAway = (
  ref: RefObject<HTMLElement | null>,
  onClickAway: ClickAwayHandler,
  enabled: boolean
) => {
  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    const handleEvent = (event: MouseEvent | TouchEvent) => {
      const node = ref.current
      const { target } = event

      if (node && target instanceof Node && !node.contains(target)) {
        onClickAway(event)
      }
    }

    document.addEventListener('click', handleEvent)
    document.addEventListener('touchend', handleEvent)

    return () => {
      document.removeEventListener('click', handleEvent)
      document.removeEventListener('touchend', handleEvent)
    }
  }, [ref, onClickAway, enabled])
}
