import React, { useRef } from 'react'
import cx from 'classnames'
import type { BaseProps, TransitionProps } from '@toptal/picasso-shared'
import {
  getElementRef,
  getTransitionTimeouts,
  useMultipleForwardRefs,
  useTransitionStatus,
} from '@toptal/picasso-utils'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import type { SlideDirection } from './styles'
import { createStateClassNames } from './styles'

export interface Props extends TransitionProps, BaseProps {
  /* Element that accepts ref */
  children: React.ReactElement
  /* Show the component; triggers the enter or exit states */
  in: boolean
  /* Callback fired when the component has entered */
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
  /* Direction in which the component will slide */
  direction: SlideDirection
}

const DEFAULT_TIMEOUT = 300

export const Slide = React.forwardRef<HTMLDivElement, Props>(function Slide(
  {
    timeout = DEFAULT_TIMEOUT,
    children,
    in: inProp,
    style,
    onEnter,
    onExited,
    direction,
  },
  ref
) {
  const nodeRef = useRef<HTMLDivElement>(null)

  const status = useTransitionStatus({
    in: inProp,
    // Historical behavior: enter callbacks fire on mount-open, with no
    // visible slide (the status flips pre-paint)
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
      // In Tailwind v4 this also covers the standalone `translate` property
      'transition-transform',
      children.props.className,
      // State classes stay after the child's className: behavior, not
      // overridable defaults
      cx(
        ...createStateClassNames(direction, {
          in: inProp,
          exited: status === 'exited' && !inProp,
        })
      )
    ),
    style: {
      transitionDuration: `${duration}ms`,
      ...style,
      ...children.props.style,
    },
    ref: combinedRef,
  })
})

Slide.displayName = 'Slide'

export default Slide
