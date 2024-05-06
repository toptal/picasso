import React, { useRef, useState, forwardRef } from 'react'
import { Transition } from 'react-transition-group'
import type { BaseProps, TransitionProps } from '@toptal/picasso-shared'
import { useMultipleForwardRefs } from '@toptal/picasso-utils'
import classNames from 'classnames'

export interface Props extends TransitionProps, BaseProps {
  /* Element that accepts ref */
  children: React.ReactElement
  /* Show the component; triggers the enter or exit states */
  in: boolean
  /* Unmount the component on exit */
  unmountOnExit?: boolean
  /* Callback fired when the component has entered */
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void
}

export const Collapse = forwardRef<HTMLDivElement, Props>(
  (
    { children, className, in: inProps, timeout = 350, unmountOnExit, ...rest },
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
      setHeight(0)
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
        nodeRef={collapseRef}
        onEntering={onEntering}
        unmountOnExit={unmountOnExit}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
        timeout={timeout}
      >
        {state => {
          const currentHeight = height === 0 ? null : { height }
          const isAnimating = state === 'entering' || state === 'exiting'

          return (
            <div
              className={classNames(className, {
                'overflow-hidden h-0': isAnimating,
                hidden: state === 'exited',
              })}
              style={{
                ...currentHeight,
                transition: isAnimating
                  ? `height ${timeout}ms ease`
                  : undefined,
              }}
              {...rest}
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
