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

  const [height, setHeight] = useState(status === 'entered' ? 'auto' : '0px')

  useIsomorphicLayoutEffect(() => {
    const measured = () => `${wrapperRef.current?.clientHeight ?? 0}px`

    if (status === 'entering') {
      setHeight('0px')

      const frame = requestAnimationFrame(() => setHeight(measured()))

      return () => cancelAnimationFrame(frame)
    }

    if (status === 'entered') {
      setHeight('auto')

      return
    }

    if (status === 'exiting') {
      setHeight(measured())

      const frame = requestAnimationFrame(() => {
        void nodeRef.current?.offsetHeight

        setHeight('0px')
      })

      return () => cancelAnimationFrame(frame)
    }

    setHeight('0px')
  }, [status])

  const [appearing, setAppearing] = useState(Boolean(appear && inProps))

  useIsomorphicLayoutEffect(() => {
    if (status === 'exiting') {
      setAppearing(false)
    }
  }, [status])

  const combinedRef = useMultipleForwardRefs([ref, nodeRef])

  const memoStyles = useMemo(() => {
    const timeouts = getTransitionTimeouts(timeout)
    const enterDuration = appearing ? timeouts.appear : timeouts.enter

    return {
      ...style,
      transitionDuration: `${inProps ? enterDuration : timeouts.exit}ms`,
      height,
    }
  }, [timeout, inProps, appearing, height, style])

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
