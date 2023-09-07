import React from 'react'
import cx from 'classnames'

import Fade from '../Fade'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  ownerState: {}
  transitionDuration: number
  invisible?: boolean
}

const Backdrop = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      transitionDuration,
      open,
      className,
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
