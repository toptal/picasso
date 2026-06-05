import type {
  MouseEvent as ReactMouseEvent,
  ReactElement,
  Ref,
  SyntheticEvent,
} from 'react'
import React, { useCallback, useEffect, useRef } from 'react'
import { toReactEvent } from '@toptal/picasso-shared'

type ClickAwayMouseEventHandler = 'onClick' | 'onMouseDown' | 'onMouseUp'
type ClickAwayTouchEventHandler = 'onTouchStart' | 'onTouchEnd'

export interface Props {
  /** The wrapped element. */
  children: ReactElement
  /** If `true`, the React tree is ignored and only the DOM tree is considered. Changes how portaled elements are handled. */
  disableReactTree?: boolean
  /** The mouse event to listen to. Pass `false` to disable the mouse listener. */
  mouseEvent?: ClickAwayMouseEventHandler | false
  /** Callback fired when a click-away event is detected. */
  onClickAway: (event: ReactMouseEvent) => void
  /** The touch event to listen to. Pass `false` to disable the touch listener. */
  touchEvent?: ClickAwayTouchEventHandler | false
}

const mapEventPropToEvent = (
  eventProp: ClickAwayMouseEventHandler | ClickAwayTouchEventHandler
): string => eventProp.substring(2).toLowerCase()

const clickedRootScrollbar = (event: Event, doc: Document): boolean => {
  const { clientX, clientY } = event as MouseEvent

  return (
    doc.documentElement.clientWidth < clientX ||
    doc.documentElement.clientHeight < clientY
  )
}

const isEventInsideNode = (
  event: Event,
  node: Element,
  doc: Document
): boolean => {
  if (event.composedPath) {
    return event.composedPath().indexOf(node) > -1
  }

  return (
    !doc.documentElement.contains(event.target as Node) ||
    node.contains(event.target as Node)
  )
}

const setRef = <T,>(ref: Ref<T> | undefined, value: T | null): void => {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    ;(ref as React.MutableRefObject<T | null>).current = value
  }
}

export const ClickAwayListener = (props: Props) => {
  const {
    children,
    disableReactTree = false,
    mouseEvent = 'onClick',
    onClickAway,
    touchEvent = 'onTouchEnd',
  } = props

  const movedRef = useRef(false)
  const nodeRef = useRef<Element | null>(null)
  const activatedRef = useRef(false)
  const syntheticEventRef = useRef(false)

  useEffect(() => {
    // Avoid activating synchronously so the interaction that mounts the
    // component does not immediately count as a click-away.
    const timeout = setTimeout(() => {
      activatedRef.current = true
    }, 0)

    return () => {
      activatedRef.current = false
      clearTimeout(timeout)
    }
  }, [])

  const childRef = (children as { ref?: Ref<Element> }).ref

  const handleRef = useCallback(
    (instance: Element | null) => {
      nodeRef.current = instance
      setRef(childRef, instance)
    },
    [childRef]
  )

  const handleClickAway = useCallback(
    (event: Event) => {
      const insideReactTree = syntheticEventRef.current

      syntheticEventRef.current = false

      const node = nodeRef.current
      const doc = node?.ownerDocument ?? document

      if (!activatedRef.current || !node || clickedRootScrollbar(event, doc)) {
        return
      }

      if (movedRef.current) {
        movedRef.current = false

        return
      }

      const insideDOM = isEventInsideNode(event, node, doc)

      if (!insideDOM && (disableReactTree || !insideReactTree)) {
        // The runtime value is the native DOM event (parity with MUI v4, which
        // also passed the native event); `toReactEvent` bridges it to the React
        // synthetic-event type the public `onClickAway` exposes.
        onClickAway(toReactEvent<ReactMouseEvent>(event))
      }
    },
    [disableReactTree, onClickAway]
  )

  const createHandleSynthetic =
    (handlerName: ClickAwayMouseEventHandler | ClickAwayTouchEventHandler) =>
    (event: SyntheticEvent) => {
      syntheticEventRef.current = true

      const childrenPropsHandlers = children.props as Record<
        string,
        ((event: SyntheticEvent) => void) | undefined
      >

      childrenPropsHandlers[handlerName]?.(event)
    }

  const childrenProps: Record<string, unknown> = { ref: handleRef }

  if (touchEvent !== false) {
    childrenProps[touchEvent] = createHandleSynthetic(touchEvent)
  }

  if (mouseEvent !== false) {
    childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent)
  }

  useEffect(() => {
    if (touchEvent === false) {
      return undefined
    }

    const mappedTouchEvent = mapEventPropToEvent(touchEvent)
    const doc = nodeRef.current?.ownerDocument ?? document

    const handleTouchMove = () => {
      movedRef.current = true
    }

    doc.addEventListener(mappedTouchEvent, handleClickAway)
    doc.addEventListener('touchmove', handleTouchMove)

    return () => {
      doc.removeEventListener(mappedTouchEvent, handleClickAway)
      doc.removeEventListener('touchmove', handleTouchMove)
    }
  }, [handleClickAway, touchEvent])

  useEffect(() => {
    if (mouseEvent === false) {
      return undefined
    }

    const mappedMouseEvent = mapEventPropToEvent(mouseEvent)
    const doc = nodeRef.current?.ownerDocument ?? document

    doc.addEventListener(mappedMouseEvent, handleClickAway)

    return () => {
      doc.removeEventListener(mappedMouseEvent, handleClickAway)
    }
  }, [handleClickAway, mouseEvent])

  return <>{React.cloneElement(children, childrenProps)}</>
}

ClickAwayListener.displayName = 'ClickAwayListener'

export default ClickAwayListener
