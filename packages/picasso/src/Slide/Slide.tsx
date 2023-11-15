import { Transition } from 'react-transition-group'
import React, { useRef } from 'react'
import type { TransitionProps } from '@toptal/picasso-shared'

import { useMultipleForwardRefs } from '../utils'

const transitionStyles = {
  right: {
    entering: { transform: 'none' },
    entered: { transform: 'none' },
    exiting: { transform: 'translateX(-100%)' },
    exited: { transform: 'translateX(-100%)' },
  },
  left: {
    entering: { transform: 'none' },
    entered: { transform: 'none' },
    exiting: { transform: 'translateX(100%)' },
    exited: { transform: 'translateX(100%)' },
  },
  up: {
    entering: { transform: 'none' },
    entered: { transform: 'none' },
    exiting: { transform: 'translateY(100%)' },
    exited: { transform: 'translateY(100%)' },
  },
  down: {
    entering: { transform: 'none' },
    entered: { transform: 'none' },
    exiting: { transform: 'translateY(-100%)' },
    exited: { transform: 'translateY(-100%)' },
  },
} as const

type Props = TransitionProps & {
  // elementAcceptingRef
  children: React.ReactElement
  style?: React.CSSProperties
  direction: 'up' | 'down' | 'left' | 'right'
  /* Show the component; triggers the enter or exit states */
  in: boolean
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
}

type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited'

const Slide = React.forwardRef<HTMLDivElement, Props>(function Slide(
  { timeout = 300, children, in: inProp, style, onEnter, onExited, direction },
  ref
) {
  const nodeRef = useRef(null)

  const combinedRef = useMultipleForwardRefs([
    ref,
    nodeRef,
    // TODO: come up with proper type for children.ref
    // @ts-ignore
    children.ref,
  ])

  return (
    <Transition
      appear
      nodeRef={nodeRef}
      in={inProp}
      timeout={timeout}
      onExited={onExited}
      onEnter={onEnter}
    >
      {(state: TransitionState, childProps: any) => {
        return React.cloneElement(children, {
          style: {
            visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
            transitionDuration: `${timeout}ms`,
            ...transitionStyles[direction][state],
            ...style,
            ...children.props.style,
          },
          className: `transform-none transition-transform ${
            children.props.className || ''
          }`,
          ref: combinedRef,
          ...childProps,
        })
      }}
    </Transition>
  )
})

export default Slide
