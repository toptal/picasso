import type { ReactNode } from 'react'
import React, { useRef, forwardRef } from 'react'
import { useMultipleForwardRefs } from '@toptal/picasso-utils'
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
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
}

const triggerReflow = (element: HTMLElement) => {
  void element.offsetHeight
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
      ...rest
    },
    ref
  ) => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const nodeRef = useRef<HTMLDivElement>(null)
    const combinedRef = useMultipleForwardRefs<HTMLDivElement>([ref, nodeRef])
    const currentState = useRef<
      'enter' | 'entering' | 'entered' | 'exit' | 'exiting' | 'exited'
    >()

    const getWrapperSize = () =>
      wrapperRef.current ? wrapperRef.current.clientHeight : 0

    const handleEnter = (_: HTMLElement, isAppearing: boolean) => {
      const node = nodeRef?.current

      if (node) {
        node.style.height = '0px'
        currentState.current = 'enter'

        if (rest.onEnter) {
          rest.onEnter(node, isAppearing)
        }
      }
    }

    const handleEntering = () => {
      const node = nodeRef?.current

      if (node) {
        node.style.height = `${getWrapperSize()}px`
        currentState.current = 'entering'
      }
    }

    const handleEntered = () => {
      const node = nodeRef?.current

      if (node) {
        node.style.height = 'auto'
        currentState.current = 'entered'
      }
    }

    const handleExit = () => {
      const node = nodeRef?.current

      if (node) {
        node.style.height = `${getWrapperSize()}px`
        currentState.current = 'exit'
      }
    }

    const handleExiting = () => {
      const node = nodeRef?.current

      if (node) {
        triggerReflow(node)
        node.style.height = '0px'
        currentState.current = 'exiting'
      }
    }

    return (
      <Transition
        in={inProps}
        appear={appear}
        nodeRef={nodeRef}
        onEnter={handleEnter}
        onEntering={handleEntering}
        onEntered={handleEntered}
        unmountOnExit={unmountOnExit}
        onExit={handleExit}
        onExiting={handleExiting}
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
              style={{ ...style, transitionDuration: `${timeout}ms` }}
              data-testid={dataTestId}
              ref={combinedRef}
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
