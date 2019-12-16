import React, { forwardRef, ReactNode } from 'react'
import MUIPopper from '@material-ui/core/Popper'
import PopperJs, { ReferenceObject } from 'popper.js'
import { BaseProps, usePicassoRoot } from '@toptal/picasso-shared'

export type PopperPlacementType =
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top'

export interface Props extends BaseProps {
  children?: ReactNode
  /** if true, the popper is visible */
  open: boolean
  /** Disable the portal behavior. The children stay within it's parent DOM hierarchy */
  disablePortal?: boolean
  /** Popper placement */
  placement?: PopperPlacementType
  /** Options provided to the popper.js instance */
  popperOptions?: object
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the picasso root node
   */
  container?: HTMLElement | (() => HTMLElement)
  /**
   * HTML Element instance or a referenceObject
   * https://popper.js.org/popper-documentation.html#referenceObject
   */
  anchorEl: null | ReferenceObject | (() => ReferenceObject)
}

export const Popper = forwardRef<PopperJs, Props>(function Popper(props, ref) {
  const picassoRootContainer = usePicassoRoot()
  const { children, open, anchorEl, className, container, ...rest } = props

  return (
    <MUIPopper
      open={open}
      container={container || picassoRootContainer}
      anchorEl={anchorEl}
      className={className}
      popperRef={ref}
      {...rest}
    >
      {children}
    </MUIPopper>
  )
})

Popper.defaultProps = {
  open: false,
  disablePortal: false,
  placement: 'bottom'
}

Popper.displayName = 'Popper'

export default Popper
