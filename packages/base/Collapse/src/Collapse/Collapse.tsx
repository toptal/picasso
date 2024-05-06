import React, { useRef, forwardRef } from 'react'
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
    {
      children,
      className,
      in: inProps,
      timeout = 350,
      unmountOnExit,
      onEnter,
      onExited,
      ...rest
    },
    ref
  ) => {
    const collapseRef = useRef<HTMLDivElement>(null)
    const combinedRef = useMultipleForwardRefs([ref, collapseRef])

    const transitionStyles = {
      entering: { height: collapseRef?.current?.scrollHeight },
      entered: { height: collapseRef?.current?.scrollHeight },
      exiting: { height: 0 },
      exited: { height: 0 },
    }

    return (
      <Transition
        in={inProps}
        nodeRef={collapseRef}
        unmountOnExit={unmountOnExit}
        timeout={timeout}
        onEnter={onEnter}
        onExited={onExited}
      >
        {(state: 'entering' | 'entered' | 'exiting' | 'exited') => {
          return (
            <div
              className={classNames(className, 'overflow-hidden')}
              style={{
                ...transitionStyles[state],
                transition: `height ${timeout}ms ease`,
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
