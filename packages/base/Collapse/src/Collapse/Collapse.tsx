import type { ReactNode } from 'react'
import React, { forwardRef, useMemo, useRef, useState } from 'react'
import cx from 'classnames'
import type { BaseProps, TransitionProps } from '@toptal/picasso-shared'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-shared'
import {
  useMultipleForwardRefs,
  useTransitionStatus,
} from '@toptal/picasso-utils'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends TransitionProps, BaseProps {
  /** Content to expand and collapse */
  children: ReactNode
  /** Show the content; toggling runs the enter or exit transition */
  in?: boolean
  /** Run the enter transition when mounting with `in` already true */
  appear?: boolean
  /** Unmount the component once it has fully exited */
  unmountOnExit?: boolean
  /** Callback fired when the enter transition starts */
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
}

const DEFAULT_TIMEOUT = 350

export const Collapse = forwardRef<HTMLDivElement, Props>(function Collapse(
  {
    children,
    className,
    in: inProp = false,
    timeout = DEFAULT_TIMEOUT,
    unmountOnExit,
    style,
    appear,
    'data-testid': dataTestId,
    onEnter,
    onExited,
    ...rest
  },
  ref
) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { status, duration } = useTransitionStatus({
    in: inProp,
    appear,
    unmountOnExit,
    timeout,
    nodeRef,
    onEnter,
    onExited,
  })

  const [height, setHeight] = useState(status === 'entered' ? 'auto' : '0px')

  // `height: auto` cannot be animated, so every phase hands the browser two
  // concrete pixel values to transition between
  useIsomorphicLayoutEffect(() => {
    const contentHeight = () => `${wrapperRef.current?.clientHeight ?? 0}px`

    if (status === 'entering') {
      // start from 0 and hand the measured height to the next frame, so the
      // browser sees two distinct values rather than one final one
      setHeight('0px')

      const frame = requestAnimationFrame(() => setHeight(contentHeight()))

      return () => cancelAnimationFrame(frame)
    }

    if (status === 'entered') {
      // `auto` lets the content resize freely while expanded
      setHeight('auto')

      return
    }

    if (status === 'exiting') {
      // pin the measured height first and collapse a frame later; reading
      // `offsetHeight` forces a reflow so the pinned value is committed
      // before 0 replaces it, otherwise the browser skips the animation
      setHeight(contentHeight())

      const frame = requestAnimationFrame(() => {
        void nodeRef.current?.offsetHeight

        setHeight('0px')
      })

      return () => cancelAnimationFrame(frame)
    }

    // `exited` and `unmounted` stay collapsed
    setHeight('0px')
  }, [status])

  const combinedRef = useMultipleForwardRefs([ref, nodeRef])

  const memoStyles = useMemo(
    () => ({ ...style, transitionDuration: `${duration}ms`, height }),
    [duration, height, style]
  )

  if (status === 'unmounted') {
    return null
  }

  return (
    <div
      {...rest}
      className={twMerge(
        'transition-[height] ease-in-out min-h-0',
        cx({
          invisible: status === 'exited' && !inProp,
          'overflow-visible': status === 'entered',
          'overflow-hidden': status !== 'entered',
        }),
        // Collapse owns this root, unlike Fade and Slide which clone a child,
        // so the consumer className wins over its overflow and visibility
        className
      )}
      style={memoStyles}
      data-testid={dataTestId}
      ref={combinedRef}
    >
      <div className='flex' ref={wrapperRef}>
        <div className='w-full'>{children}</div>
      </div>
    </div>
  )
})

Collapse.displayName = 'Collapse'

export default Collapse
