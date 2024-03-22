import React from 'react'
import cx from 'classnames'
import { Fade } from '@toptal/picasso-fade'
import type { ModalBackdropSlotProps } from '@mui/base/Modal'

export interface Props extends ModalBackdropSlotProps {
  /** The duration for the transition, in milliseconds */
  transitionDuration?: number
  /** If true, the backdrop is invisible */
  invisible?: boolean
}

export const Backdrop = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      transitionDuration = 300,
      open,
      invisible = false,
      // we want to omit ownerState from spreading to the DOM
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ownerState,
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
