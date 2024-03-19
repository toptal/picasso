import React, { useRef } from 'react'
import { Transition } from 'react-transition-group'
import type { BaseProps, TransitionProps } from '@toptal/picasso-shared'
import { useMultipleForwardRefs } from '@toptal/picasso-utils'

export interface Props extends TransitionProps, BaseProps {
  /* Element that accepts ref */
  children: React.ReactElement
  /* Show the component; triggers the enter or exit states */
  in: boolean
  /* Callback fired when the component has entered */
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
}

export const Fade = React.forwardRef<HTMLDivElement, Props>(
  ({ timeout = 300, children, in: inProp, style, onEnter, onExited }, ref) => {
    const nodeRef = useRef(null)
    const transitionStyles = {
      entering: { opacity: 1 },
      entered: { opacity: 1 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 },
    }

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
              ...transitionStyles[state],
              ...style,
              ...children.props.style,
            },
            className: `opacity-0 transition-opacity ${
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

export default Fade
