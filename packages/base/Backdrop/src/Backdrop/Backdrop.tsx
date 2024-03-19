import React from 'react'
import cx from 'classnames'
import { Fade } from '@toptal/picasso-fade'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Show the component; triggers the enter or exit states */
  open: boolean
  /** The duration for the transition, in milliseconds */
  transitionDuration?: number
  /** If true, the backdrop is invisible */
  invisible?: boolean
}

export const Backdrop = React.forwardRef<HTMLDivElement, Props>(
  (
    { transitionDuration = 300, open, className, invisible = false, ...rest },
    ref
  ) => {
    return (
      <Fade in={open} timeout={transitionDuration}>
        <div
          className={cx(
            className,
            'fixed -z-[1] inset-0 bg-black ',
            '-webkit-tap-highlight-color-transparent',
            { 'bg-opacity-0': invisible },
            { 'bg-opacity-50': !invisible }
          )}
          ref={ref}
          {...rest}
        />
      </Fade>
    )
  }
)

export default Backdrop
