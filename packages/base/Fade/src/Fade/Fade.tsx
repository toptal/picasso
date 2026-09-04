import React, { useRef } from 'react'
import cx from 'classnames'
import type {
  BaseProps,
  TransitionChild,
  TransitionProps,
} from '@toptal/picasso-shared'
import {
  getElementRef,
  getTransitionTimeouts,
  useMultipleForwardRefs,
  useTransitionStatus,
} from '@toptal/picasso-utils'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends TransitionProps, BaseProps {
  /* Element that accepts ref */
  children: TransitionChild
  /* Show the component; triggers the enter or exit states */
  in: boolean
  /* Callback fired when the component has entered */
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
}

const DEFAULT_TIMEOUT = 300

export const Fade = React.forwardRef<HTMLDivElement, Props>(function Fade(
  { timeout = DEFAULT_TIMEOUT, children, in: inProp, style, onEnter, onExited },
  ref
) {
  const nodeRef = useRef<HTMLDivElement>(null)

  const status = useTransitionStatus({
    in: inProp,
    // Historical behavior: enter callbacks fire on mount-open, with no
    // visible fade (the status flips pre-paint)
    appear: true,
    timeout,
    nodeRef,
    onEnter,
    onExited,
  })

  const combinedRef = useMultipleForwardRefs([
    ref,
    nodeRef,
    getElementRef<HTMLDivElement>(children),
  ])

  const timeouts = getTransitionTimeouts(timeout)
  const duration = inProp ? timeouts.enter : timeouts.exit

  return React.cloneElement(children, {
    className: twMerge(
      'transition-opacity',
      children.props.className,
      // behavior classes, not defaults — must stay after the child's className
      cx({
        'opacity-0': !inProp,
        invisible: status === 'exited' && !inProp,
      })
    ),
    style: {
      transitionDuration: `${duration}ms`,
      ...style,
      ...children.props.style,
    },
    ref: combinedRef,
  })
})

Fade.displayName = 'Fade'

export default Fade
