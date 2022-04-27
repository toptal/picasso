import { MouseEvent, useCallback, useRef } from 'react'
import { Instance as PopperJs } from '@popperjs/core'
import debounce from 'debounce'

import { TooltipState } from './useTooltipState'

interface UseTooltipFollowCursorOptions {
  followCursor: boolean
  tooltipState: TooltipState
}

interface CursorPosition {
  x: number
  y: number
}

export const mouseMoveDebounceTimeout = 250
export const mouseMoveCloseTooltipDistance = 50

const isMouseMovedTooFar = (
  positionA: CursorPosition,
  positionB: CursorPosition
): boolean =>
  Math.abs(positionA.x - positionB.x) > mouseMoveCloseTooltipDistance ||
  Math.abs(positionA.y - positionB.y) > mouseMoveCloseTooltipDistance

export const useTooltipFollowCursor = ({
  followCursor,
  tooltipState
}: UseTooltipFollowCursorOptions) => {
  const { targetHoveredRef, openTooltip, closeTooltip } = tooltipState
  const positionRef = useRef<CursorPosition>({ x: 0, y: 0 })
  const mouseMoveStartPositionRef = useRef<CursorPosition | null>(null)
  const popperRef = useRef<PopperJs | null>(null)

  const handleMouseStop = useCallback(() => {
    if (targetHoveredRef.current) {
      mouseMoveStartPositionRef.current = null
      openTooltip()
    }
  }, [targetHoveredRef])
  const handleMouseStopDebounced = useCallback(
    debounce(handleMouseStop, mouseMoveDebounceTimeout),
    [debounce, handleMouseStop]
  )
  const calculateTooltipPosition = (event: MouseEvent<HTMLElement>) => {
    if (!mouseMoveStartPositionRef.current) {
      mouseMoveStartPositionRef.current = { x: event.clientX, y: event.clientY }
    }

    positionRef.current = { x: event.clientX, y: event.clientY }

    popperRef.current?.update()
  }
  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    calculateTooltipPosition(event)

    const shouldCloseTooltip = isMouseMovedTooFar(
      positionRef.current,
      mouseMoveStartPositionRef?.current ?? positionRef.current
    )

    // When the cursor is moved `mouseMoveCloseTooltipDistance` pixels and more in any direction, we close the tooltip
    // We need it because when the cursor is moved to a long distance, the tooltip becomes annoying
    if (shouldCloseTooltip) {
      closeTooltip()
    }

    handleMouseStopDebounced()
  }

  if (!followCursor) {
    return undefined
  }

  return {
    handleMouseMove,
    handleMouseOver: calculateTooltipPosition,
    handleClick: calculateTooltipPosition,
    followCursorPopperProps: {
      popperRef,
      modifiers: [
        {
          name: 'offset',
          enabled: true,
          options: {
            offset: [0, 10]
          }
        }
      ],
      anchorEl: {
        clientHeight: 0,
        clientWidth: 0,
        getBoundingClientRect: () => ({
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          top: positionRef.current.y,
          left: positionRef.current.x,
          right: positionRef.current.x,
          bottom: positionRef.current.y,
          // this field required according to types
          toJSON: () => {}
        })
      }
    }
  }
}
