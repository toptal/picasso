/* eslint-disable import/no-extraneous-dependencies */
import type { ChangeEvent, MouseEvent, ReactElement } from 'react'
import { cloneElement, useState } from 'react'

import type { TooltipState } from './use-tooltip-state'
import type { ChildrenProps } from './types'

interface UseTooltipHandlersOptions {
  onOpen?: (event: ChangeEvent<{}>) => void
  onClose?: (event: ChangeEvent<{}>) => void
  onMouseOver?: (event: MouseEvent<HTMLElement>) => void
  onMouseMove?: (event: MouseEvent<HTMLElement>) => void
  onClick?: (event: MouseEvent<HTMLElement>) => void
  children: ReactElement<ChildrenProps>
  tooltipState: TooltipState
  disableListeners?: boolean
}

export const useTooltipHandlers = ({
  onClose,
  onOpen,
  onMouseOver,
  onMouseMove,
  onClick,
  tooltipState,
  disableListeners,
  children,
}: UseTooltipHandlersOptions) => {
  const {
    isOpen,
    isControlled,
    isTouchDevice,
    targetHoveredRef,
    openTooltip,
    closeTooltip,
  } = tooltipState
  // After closing with click the tooltip should not be opened againg until the mouse leave event
  const [ignoreOpening, setIgnoreOpening] = useState(false)

  if (isControlled) {
    return {
      handleOpen: onOpen,
      handleClose: onClose,
      children,
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
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    children.props.onClick?.(event)

    if (disableListeners) {
      return
    }

    if (isOpen) {
      setIgnoreOpening(true)
      handleClose(event)
    } else if (isTouchDevice) {
      handleOpen(event)
    }

    onClick?.(event)
  }
  const handleMouseOver = (event: MouseEvent<HTMLElement>) => {
    children.props.onMouseOver?.(event)

    if (disableListeners) {
      return
    }

    targetHoveredRef.current = true
    onMouseOver?.(event)
  }
  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    children.props.onMouseMove?.(event)

    if (disableListeners) {
      return
    }

    onMouseMove?.(event)
  }
  const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
    children.props.onMouseLeave?.(event)

    if (disableListeners) {
      return
    }

    targetHoveredRef.current = false
    setIgnoreOpening(false)
  }

  return {
    handleOpen,
    handleClose,
    children: cloneElement(children, {
      onClick: handleClick,
      onMouseOver: handleMouseOver,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    }),
  }
}
