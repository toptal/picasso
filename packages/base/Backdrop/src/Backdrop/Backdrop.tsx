import React from 'react'
import cx from 'classnames'
import { Fade } from '@toptal/picasso-fade'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** If `true`, the backdrop is visible */
  open: boolean
  /** The duration for the transition, in milliseconds */
  transitionDuration?: number
  /** If true, the backdrop is invisible */
  invisible?: boolean
  /** Passed through by @mui/base/Modal's slot machinery; ignored at render. */
  ownerState?: unknown
}

export const Backdrop = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      transitionDuration = 300,
      open,
      invisible = false,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ownerState,
      // @mui/base/Modal injects its own .base-Modal-backdrop className; drop it.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      className: _className,
      ...rest
    },
    ref
  ) => {
    return (
      <Fade in={open} timeout={transitionDuration}>
        <div
          className={cx(
            'fixed -z-[1] inset-0 bg-black ',
            '-webkit-tap-highlight-color-transparent',
            { 'bg-black/0': invisible },
            { 'bg-black/50': !invisible }
          )}
          ref={ref}
          {...rest}
        />
      </Fade>
    )
  }
)

export default Backdrop
