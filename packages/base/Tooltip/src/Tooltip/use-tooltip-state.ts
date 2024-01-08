import type { MutableRefObject } from 'react'
import { useRef, useState } from 'react'
import { isPointerDevice } from '@toptal/picasso-utils'

interface UseTooltipStateOptions {
  externalOpen?: boolean
  followCursor: boolean
}

export interface TooltipState {
  isOpen: boolean
  isControlled: boolean
  isTouchDevice: boolean
  targetHoveredRef: MutableRefObject<boolean>
  openTooltip: () => void
  closeTooltip: () => void
}

const getTooltipOpenState = ({
  isOpen,
  isOpenExternally,
  isControlled,
  isTouchDevice,
  followCursor,
}: {
  isOpen: boolean
  isOpenExternally: boolean
  isControlled: boolean
  isTouchDevice: boolean
  followCursor: boolean
}): boolean => {
  // We don't support `followCursor` prop when this prop is enabled on the touch device. Same as in `@material-ui@5`
  if (isTouchDevice && followCursor) {
    return false
  }

  if (isControlled) {
    return isOpenExternally
  }

  return isOpen
}

export const useTooltipState = ({
  externalOpen,
  followCursor,
}: UseTooltipStateOptions): TooltipState => {
  const isTouchDevice = !isPointerDevice()
  const isTooltipControlled = typeof externalOpen !== 'undefined'
  const [isOpen, setIsOpen] = useState(
    isTooltipControlled ? externalOpen : false
  )
  const targetHoveredRef = useRef(false)

  const openTooltip = () => {
    setIsOpen(true)
  }
  const closeTooltip = () => {
    setIsOpen(false)
  }

  return {
    isOpen: getTooltipOpenState({
      isOpen,
      isOpenExternally: !!externalOpen,
      isControlled: isTooltipControlled,
      isTouchDevice,
      followCursor,
    }),
    isControlled: isTooltipControlled,
    isTouchDevice,
    targetHoveredRef,
    openTooltip,
    closeTooltip,
  }
}
