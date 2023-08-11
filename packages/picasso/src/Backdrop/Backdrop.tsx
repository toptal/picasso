import React from 'react'
import cx from 'classnames'

import Fade from '../Fade'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  ownerState: {}
  transitionDuration: number
}

const Backdrop = React.forwardRef<HTMLDivElement, Props>(
  // we want to omit ownerState from spreading to the DOM
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ transitionDuration, open, className, ownerState, ...rest }, ref) => {
    return (
      <Fade in={open} timeout={transitionDuration}>
        <div
          className={cx(
            className,
            'fixed -z-[1] inset-0 bg-black bg-opacity-50',
            '-webkit-tap-highlight-color-transparent'
          )}
          ref={ref}
          {...rest}
        />
      </Fade>
    )
  }
)

export default Backdrop
