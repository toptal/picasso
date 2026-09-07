import React, { useRef } from 'react'
import cx from 'classnames'
import type {
  BaseProps,
  TransitionChild,
  TransitionProps,
} from '@toptal/picasso-shared'
import {
  getElementRef,
  useMultipleForwardRefs,
  useTransitionStatus,
} from '@toptal/picasso-utils'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import type { SlideDirection } from './styles'
import { createTranslateClassNames } from './styles'

export interface Props extends TransitionProps, BaseProps {
  /** Element that accepts ref */
  children: TransitionChild
  /** Show the component; toggling runs the enter or exit transition */
  in: boolean
  /** Callback fired when the enter transition starts */
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
  /** Direction in which the component will slide */
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

  const { status, duration } = useTransitionStatus({
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

  return React.cloneElement(children, {
    className: twMerge(
      // In Tailwind v4 this also covers the standalone `translate` property
      'transition-transform',
      children.props.className,
      // behavior classes, not defaults — must stay after the child's className
      cx(createTranslateClassNames(direction, inProp), {
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

Slide.displayName = 'Slide'

export default Slide
