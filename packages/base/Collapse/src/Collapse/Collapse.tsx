import React, { useRef, useState, forwardRef } from 'react'
import { Transition } from 'react-transition-group'
import type { BaseProps, TransitionProps } from '@toptal/picasso-shared'
import { useMultipleForwardRefs } from '@toptal/picasso-utils'
import cx from 'classnames'
import { twMerge } from 'tailwind-merge'

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
      'data-testid': dataTestId,
      ...rest
    },
    ref
  ) => {
    const collapseRef = useRef<HTMLDivElement>(null)
    const combinedRef = useMultipleForwardRefs([ref, collapseRef])

    const [height, setHeight] = useState<number>()

    const onEntering = () => {
      // onShow && onShow()
      if (collapseRef.current) {
        setHeight(collapseRef.current.scrollHeight)
      }
    }

    const onEntered = () => {
      // setHeight(0)
    }

    const onExit = () => {
      if (collapseRef.current) {
        setHeight(collapseRef.current.scrollHeight)
      }
    }

    const onExiting = () => {
      // onHide && onHide()

      setHeight(0)
    }

    const onExited = () => {
      setHeight(0)
    }

    return (
      <Transition
        in={inProps}
        appear={appear}
        nodeRef={collapseRef}
        onEntering={onEntering}
        unmountOnExit={unmountOnExit}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
        timeout={timeout}
        {...rest}
      >
        {state => {
          const currentHeight = height === 0 ? null : { maxHeight: height }
          const isAnimating = state === 'entering' || state === 'exiting'

          return (
            <div
              className={twMerge(
                cx(className, {
                  'overflow-hidden max-h-0': isAnimating,
                  hidden: state === 'exited',
                }),
                className
              )}
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
