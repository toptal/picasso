import React, { useRef, useState, forwardRef } from 'react'
import { Transition } from 'react-transition-group'
import type { BaseProps, TransitionProps } from '@toptal/picasso-shared'
import { useMultipleForwardRefs } from '@toptal/picasso-utils'
import { twJoin } from 'tailwind-merge'

export interface Props extends TransitionProps, BaseProps {
  /* Element that accepts ref */
  children: React.ReactElement
  /* Show the component; triggers the enter or exit states */
  in?: boolean
  /* Trigger the transition on the first mount, regardless of the `in` prop. */
  appear?: boolean
  /* Unmount the component on exit */
  unmountOnExit?: boolean
  /* Callback fired when the component has entered */
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
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
      onExited: onExitedProp,
      'data-testid': dataTestId,
      ...rest
    },
    ref
  ) => {
    const collapseRef = useRef<HTMLDivElement>(null)
    const combinedRef = useMultipleForwardRefs([ref, collapseRef])

    const [height, setHeight] = useState<number>()

    const setToCurrentHeight = () => {
      if (collapseRef.current) {
        setHeight(collapseRef.current.scrollHeight)
      }
    }

    const resetHeight = () => {
      setHeight(0)
    }

    const onExited = (node: HTMLElement) => {
      resetHeight()
      if (onExitedProp) {
        onExitedProp(node)
      }
    }

    return (
      <Transition
        in={inProps}
        appear={appear}
        nodeRef={collapseRef}
        onEntering={setToCurrentHeight}
        unmountOnExit={unmountOnExit}
        onExit={setToCurrentHeight}
        onExiting={resetHeight}
        onExited={onExited}
        timeout={timeout}
        {...rest}
      >
        {state => {
          const currentHeight = height === 0 ? null : { maxHeight: height }
          const isAnimating = state === 'entering' || state === 'exiting'

          return (
            <div
              className={twJoin([
                isAnimating ? 'overflow-hidden max-h-0' : undefined,
                state === 'exited' ? 'hidden' : undefined,
                className,
              ])}
              style={{
                ...style,
                ...currentHeight,
                transition: isAnimating
                  ? `max-height ${timeout}ms ease`
                  : undefined,
              }}
              data-testid={dataTestId}
              ref={combinedRef}
            >
              {children}
            </div>
          )
        }}
      </Transition>
    )
  }
)

export default Collapse
