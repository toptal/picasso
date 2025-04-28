import React from 'react'
import cx from 'classnames'
import { Fade } from '@toptal/picasso-fade'

export interface Props {
  /** The duration for the transition, in milliseconds */
  transitionDuration?: number
  /** If true, the backdrop is invisible */
  invisible?: boolean
  /** Whether the backdrop is open */
  open?: boolean
  /** Additional class names */
  className?: string
  /** Callback fired when the backdrop is clicked */
  onClick?: React.MouseEventHandler<HTMLDivElement>
  /** Aria hidden attribute */
  'aria-hidden'?: boolean | 'false' | 'true'
  /** Any other props */
  [key: string]: any
}

export const Backdrop = React.forwardRef<HTMLDivElement, Props>(
  (
    { transitionDuration = 300, open, invisible = false, className, ...rest },
    ref
  ) => {
    return (
      <Fade in={Boolean(open)} timeout={transitionDuration}>
        <div
          className={cx(
            'fixed -z-[1] inset-0 bg-black ',
            '-webkit-tap-highlight-color-transparent',
            { 'bg-opacity-0': invisible },
            { 'bg-opacity-50': !invisible },
            className
          )}
          ref={ref}
          {...rest}
        />
      </Fade>
    )
  }
)

export default Backdrop
