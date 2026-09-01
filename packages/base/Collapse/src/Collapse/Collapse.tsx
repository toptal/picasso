import type { ReactNode } from 'react'
import React, { forwardRef, useMemo, useRef, useState } from 'react'
import type { BaseProps, TransitionProps } from '@toptal/picasso-shared'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-shared'
import {
  getTransitionTimeouts,
  useMultipleForwardRefs,
  useTransitionStatus,
} from '@toptal/picasso-utils'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends TransitionProps, BaseProps {
  /* Element that accepts ref */
  children: ReactNode
  /* Show the component; triggers the enter or exit states */
  in?: boolean
  /* Trigger the transition on the first mount, regardless of the `in` prop. */
  appear?: boolean
  /* Unmount the component on exit */
  unmountOnExit?: boolean
  /* Callback fired when the component has entered */
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
}

export const Collapse = forwardRef<HTMLDivElement, Props>(function Collapse(
  {
    children,
    className,
    in: inProps = false,
    timeout = 350,
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

  const status = useTransitionStatus({
    in: inProps,
    appear,
    unmountOnExit,
    timeout,
    nodeRef,
    onEnter,
    onExited,
  })

  const [height, setHeight] = useState<string>(
    inProps && !appear ? 'auto' : '0px'
  )

  // The from-value and to-value of a height transition must land in separate
  // painted frames, or CSS sees a single change and skips the animation. The
  // inner wrapper keeps its natural clientHeight even while the outer div is
  // collapsed, so measuring is always synchronous.
  useIsomorphicLayoutEffect(() => {
    const measured = () => `${wrapperRef.current?.clientHeight ?? 0}px`

    if (status === 'entering') {
      setHeight('0px')

      const frame = requestAnimationFrame(() => setHeight(measured()))

      return () => cancelAnimationFrame(frame)
    }

    if (status === 'entered') {
      // height 'auto' after the transition supports dynamic content inside
      setHeight('auto')

      return
    }

    if (status === 'exiting') {
      setHeight(measured())

      const frame = requestAnimationFrame(() => setHeight('0px'))

      return () => cancelAnimationFrame(frame)
    }

    setHeight('0px')
  }, [status])

  const combinedRef = useMultipleForwardRefs([ref, nodeRef])

  const memoStyles = useMemo(() => {
    const timeouts = getTransitionTimeouts(timeout)

    return {
      ...style,
      transitionDuration: `${inProps ? timeouts.enter : timeouts.exit}ms`,
      height,
    }
  }, [timeout, inProps, height, style])

  if (status === 'unmounted') {
    return null
  }

  return (
    <div
      {...rest}
      className={twMerge([
        'transition-[height] ease-in-out min-h-0',
        status === 'exited' && !inProps && 'invisible',
        status === 'entered' ? 'overflow-visible' : 'overflow-hidden',
        className,
      ])}
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
