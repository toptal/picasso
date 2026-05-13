import React from 'react'
import cx from 'classnames'
import { Fade } from '@toptal/picasso-fade'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** The duration for the transition, in milliseconds */
  transitionDuration?: number
  /** If `true`, the backdrop is shown */
  open: boolean
  /** If true, the backdrop is invisible */
  invisible?: boolean
}

// @mui/base/Modal injects `ownerState` and a stale `base-Modal-backdrop`
// className via its slot mechanism. Modal + Drawer still rely on that path
// until they migrate off @mui/base, so strip both at runtime to keep them
// off the rendered DOM.
type InternalBackdropProps = Props & { ownerState?: unknown }

export const Backdrop = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const {
      transitionDuration = 300,
      open,
      invisible = false,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      ownerState: _ownerState,
      className: _className,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...rest
    } = props as InternalBackdropProps

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
