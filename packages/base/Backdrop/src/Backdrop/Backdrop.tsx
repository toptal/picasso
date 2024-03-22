import React from 'react'
import cx from 'classnames'
import { Fade } from '@toptal/picasso-fade'
import type { ModalBackdropSlotProps } from '@mui/base/Modal'

export interface Props extends ModalBackdropSlotProps {
  /** The duration for the transition, in milliseconds */
  transitionDuration?: number
  /** If true, the backdrop is invisible */
  invisible?: boolean
  className?: string
}

export const Backdrop = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      transitionDuration = 300,
      open,
      invisible = false,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      // we want to omit ownerState from spreading to the DOM
      ownerState,
      // @mui/base/Modal adds default class wich we don't need .base-Modal-backdrop
      className,
      /* eslint-enable */
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
