import type { ReactNode } from 'react'
import React, { forwardRef, useEffect, useMemo, useState } from 'react'
import { Transition } from 'react-transition-group'
import type { BaseProps, TransitionProps } from '@toptal/picasso-shared'
import { twJoin } from '@toptal/picasso-tailwind-merge'

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
  onEnter?: (node: HTMLElement | null, isAppearing: boolean) => void
}

export const Collapse = forwardRef<HTMLDivElement, Props>(
  (
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
  ) => {
    const [transitionState, setTransitionState] = React.useState<
      'enter' | 'entering' | 'entered' | 'exit' | 'exiting' | 'exited'
    >(inProps && !appear ? 'entered' : 'exited')

    const [height, setHeight] = useState<string>('0px')
    const wrapperRef = React.useRef<HTMLDivElement>(null)

    const handleEnter = (node: HTMLElement, isAppearing: boolean) => {
      setTransitionState('enter')
      onEnter?.(node, isAppearing)
    }
    const handleEntering = () => setTransitionState('entering')
    const handleEntered = () => setTransitionState('entered')
    const handleExit = () => setTransitionState('exit')
    const handleExiting = () => setTransitionState('exiting')
    const handleExited = (node: HTMLElement) => {
      setTransitionState('exited')
      onExited?.(node)
    }

    useEffect(() => {
      const transitionStates = {
        closed: '0px',
        transition: `${wrapperRef.current?.clientHeight}px`,
        opened: 'auto',
      }

      const heightByState = {
        enter: transitionStates.closed,
        entering: transitionStates.transition,
        entered: transitionStates.opened,
        exit: transitionStates.transition,
        exiting: transitionStates.closed,
        exited: transitionStates.closed,
      } as const

      if (transitionState === 'exiting' || transitionState === 'entering') {
        // we need to add small delay as 'exit' and 'exiting'
        // are triggered in the same time and React is batching them
        setTimeout(() => setHeight(heightByState[transitionState]), 50)
      } else {
        setHeight(heightByState[transitionState])
      }
    }, [transitionState])

    const memoStyles = useMemo(() => {
      return {
        ...style,
        transitionDuration: `${timeout}ms`,
        height,
      }
    }, [timeout, height, style])

    return (
      <Transition
        in={inProps}
        appear={appear}
        onEnter={handleEnter}
        onEntering={handleEntering}
        onEntered={handleEntered}
        onExit={handleExit}
        onExiting={handleExiting}
        onExited={handleExited}
        unmountOnExit={unmountOnExit}
        timeout={timeout}
        {...rest}
      >
        {state => {
          return (
            <div
              className={twJoin([
                'transition-[height] ease-in-out min-h-0',
                state === 'exited' && !inProps && 'invisible',
                state === 'entered' ? 'overflow-visible' : 'overflow-hidden',
                className,
              ])}
              style={memoStyles}
              data-testid={dataTestId}
              ref={ref}
            >
              <div className='flex' ref={wrapperRef}>
                <div className='w-full'>{children}</div>
              </div>
            </div>
          )
        }}
      </Transition>
    )
  }
)

export default Collapse
