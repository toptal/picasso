import { Transition } from 'react-transition-group'
import React, { useRef } from 'react'
import type { TransitionProps } from '@toptal/picasso-shared'

import { useMultipleForwardRefs } from '../utils'

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

type Props = TransitionProps & {
  // elementAcceptingRef
  children: React.ReactElement
  style?: React.CSSProperties
  /* Show the component; triggers the enter or exit states */
  in: boolean
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
}

type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited'

const Fade = React.forwardRef<HTMLDivElement, Props>(function Fade(
  { timeout = 300, children, in: inProp, style, onEnter, onExited },
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
})

export default Fade
