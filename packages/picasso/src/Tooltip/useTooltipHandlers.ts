import { ChangeEvent, cloneElement, ReactElement, useState } from 'react'

import { TooltipState } from './useTooltipState'
import { ChildrenProps } from './types'

interface UseTooltipHandlersOptions {
  onOpen?: (event: ChangeEvent<{}>) => void
  onClose?: (event: ChangeEvent<{}>) => void
  children: ReactElement<ChildrenProps>
  tooltipState: TooltipState
  disableListeners?: boolean
}

export const useTooltipHandlers = ({
  onClose,
  onOpen,
  tooltipState,
  disableListeners,
  children
}: UseTooltipHandlersOptions) => {
  const {
    isOpen,
    isControlled,
    isTouchDevice,
    targetHoveredRef,
    openTooltip,
    closeTooltip
  } = tooltipState
  // After closing with click the tooltip should not be opened againg until the mouse leave event
  const [ignoreOpening, setIgnoreOpening] = useState(false)

  if (isControlled) {
    return {
      handleOpen: onOpen,
      handleClose: onClose,
      children
    }
  }
  const handleClose = (event: ChangeEvent<{}>) => {
    onClose?.(event)
    closeTooltip()
  }
  const handleOpen = (event: ChangeEvent<{}>) => {
    if (ignoreOpening) {
      return
    }

    onOpen?.(event)
    openTooltip()
  }
  const handleClick = (event: ChangeEvent<{}>) => {
    if (disableListeners) {
      return
    }

    children.props.onClick?.(event)
    if (isOpen) {
      setIgnoreOpening(true)
      handleClose(event)
    } else if (isTouchDevice) {
      handleOpen(event)
    }
  }
  const handleMouseEnter = () => {
    targetHoveredRef.current = true
  }
  const handleMouseLeave = () => {
    targetHoveredRef.current = false
    setIgnoreOpening(false)
  }

  return {
    handleOpen,
    handleClose,
    children: cloneElement(children, {
      onClick: handleClick,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    })
  }
}
