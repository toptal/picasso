import React from 'react'
import cx from 'classnames'
import { Fade } from '@toptal/picasso-fade'
import type { BaseProps } from '@toptal/picasso-shared'

export interface Props
  extends BaseProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** The duration for the transition, in milliseconds */
  transitionDuration?: number
  /** If `true`, the backdrop is shown */
  open: boolean
  /** If true, the backdrop is invisible */
  invisible?: boolean
  ownerState?: unknown
}

export const Backdrop = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const {
      transitionDuration = 300,
      open,
      invisible = false,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ownerState: _ownerState,
      className,
      ...rest
    } = props

    return (
      <Fade in={open} timeout={transitionDuration}>
        <div
          className={cx(
            'fixed -z-[1] inset-0 bg-black',
            '-webkit-tap-highlight-color-transparent',
            { 'bg-black/0': invisible },
            { 'bg-black/50': !invisible },
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
