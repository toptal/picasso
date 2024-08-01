import type { ReactNode } from 'react'
import React, { useRef, forwardRef, useMemo } from 'react'
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
  onEnter?: (node: HTMLElement | null, isAppearing: boolean) => void
}

/**
 * Forces a reflow of the specified element by accessing its offsetHeight property.
 * This is necessary to ensure that any pending style changes are applied immediately.
 * Without this, the browser might batch style updates causing the transition not to run as expected.
 */
const triggerReflow = (element: HTMLElement | null) => {
  if (!element) {
    return
  }
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

    // Memoized style object to avoid unnecessary recalculations
    const transitionStyle = useMemo(
      () => ({ transitionDuration: `${timeout}ms`, ...style }),
      [timeout, style]
    )

    const getWrapperSize = () =>
      wrapperRef.current ? wrapperRef.current.clientHeight : 0

    const heightByState = {
      closed: '0px',
      transition: `${getWrapperSize()}px`,
      opened: 'auto',
    }

    const setNodeHeight = (height: string) => {
      const node = nodeRef.current

      if (!node) {
        return
      }

      node.style.height = height
    }

    const handleEnter = (_: HTMLElement, isAppearing: boolean) => {
      setNodeHeight(heightByState.closed)

      if (rest.onEnter) {
        rest.onEnter(nodeRef.current, isAppearing)
      }
    }

    const handleEntering = () => {
      setNodeHeight(`${getWrapperSize()}px`)
    }

    const handleEntered = () => {
      setNodeHeight(heightByState.opened)
    }

    const handleExit = () => {
      setNodeHeight(heightByState.transition)
    }

    const handleExiting = () => {
      // Trigger a reflow to ensure the transition runs as expected
      triggerReflow(nodeRef.current)
      setNodeHeight(heightByState.closed)
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
              style={transitionStyle}
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
