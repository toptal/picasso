import React, { useRef } from 'react'
import { Transition } from 'react-transition-group'
import type { BaseProps, TransitionProps } from '@toptal/picasso-shared'
import { useMultipleForwardRefs } from '@toptal/picasso-utils'

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

export interface Props extends TransitionProps, BaseProps {
  /* Element that accepts ref */
  children: React.ReactElement
  /* Show the component; triggers the enter or exit states */
  in: boolean
  /* Callback fired when the component has entered */
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
  /* Direction in which the component will slide */
  direction: 'up' | 'down' | 'left' | 'right'
}

export const Slide = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      timeout = 300,
      children,
      in: inProp,
      style,
      onEnter,
      onExited,
      direction,
    },
    ref
  ) => {
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
        {(
          state: 'entering' | 'entered' | 'exiting' | 'exited',
          childProps: {}
        ) => {
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
  }
)

export default Slide
