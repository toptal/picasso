import type { ReactNode } from 'react'
import React, { forwardRef, useMemo, useState } from 'react'
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

const useCollapseLogic = () => {
  const [height, setHeight] = useState<string>('0px')
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  const getCurrentHeight = () => wrapperRef.current?.clientHeight
  const setHeightToCurrent = () => setHeight(`${getCurrentHeight()}px`)
  const setHeightToZero = () => setHeight('0px')
  const setHeightToAuto = () => setHeight('auto')

  return {
    height,
    wrapperRef,
    setHeightToCurrent,
    setHeightToZero,
    setHeightToAuto,
  }
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
    const {
      height,
      wrapperRef,
      setHeightToZero,
      setHeightToAuto,
      setHeightToCurrent,
    } = useCollapseLogic()

    // we need to add small delay as 'enter', 'entering' and 'exit', 'exiting'
    // are triggered in the same time and React is batching them
    const handleEntering = () => setTimeout(setHeightToCurrent, 50)
    const handleExiting = () => setTimeout(setHeightToZero, 50)

    const handleEnter = (node: HTMLElement, isAppearing: boolean) => {
      setHeightToZero()
      onEnter?.(node, isAppearing)
    }

    const handleExited = (node: HTMLElement) => {
      setHeightToZero()
      onExited?.(node)
    }

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
        // we need to set height to 'auto' after transition is finished
        // to support dynamic content inside Collapse
        onEntered={setHeightToAuto}
        onExit={setHeightToCurrent}
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
