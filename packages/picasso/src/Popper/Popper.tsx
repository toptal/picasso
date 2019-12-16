import React, { forwardRef, ReactNode, useLayoutEffect } from 'react'
import cx from 'classnames'
import MUIPopper from '@material-ui/core/Popper'
import { Theme, makeStyles } from '@material-ui/core/styles'
import PopperJs, { ReferenceObject, PopperOptions } from 'popper.js'
import { BaseProps, usePicassoRoot } from '@toptal/picasso-shared'

import { useBreakpoint, useWidthOf } from '../utils'
import styles from './styles'

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
  popperOptions?: PopperOptions
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
  /** Popper automatically resize to anchor element width */
  autoWidth?: boolean
}

const useStyles = makeStyles<Theme, Props>(styles)

function getAnchorEl(
  anchorEl: null | ReferenceObject | (() => ReferenceObject)
) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl
}

function getPopperOptions(
  popperOptions: PopperOptions,
  isCompactLayout: boolean
) {
  return {
    ...popperOptions,
    modifiers: {
      ...popperOptions.modifiers,
      flip: {
        enabled: true,
        // replace with optional chaining
        ...(popperOptions.modifiers && popperOptions.modifiers.flip)
      },
      preventOverflow: {
        enabled: true,
        boundariesElement: 'viewport',
        padding: isCompactLayout
          ? 0
          : { top: 72, bottom: 5, left: 5, right: 5 }, // top needs more offset to include header height
        // replace with optional chaining
        ...(popperOptions.modifiers && popperOptions.modifiers.preventOverflow)
      }
    }
  }
}

export const Popper = forwardRef<PopperJs, Props>(function Popper(props, ref) {
  const {
    children,
    open,
    anchorEl,
    className,
    container,
    popperOptions,
    autoWidth,
    style,
    ...rest
  } = props

  const picassoRootContainer = usePicassoRoot()

  const classes = useStyles(props)
  const isCompactLayout = useBreakpoint(['small', 'medium'])

  const resolvedAnchorEl = getAnchorEl(anchorEl)
  const anchorElWidth = useWidthOf<ReferenceObject>(resolvedAnchorEl)
  const anchorElWidthStyle =
    !isCompactLayout && autoWidth ? { width: anchorElWidth } : {}

  useLayoutEffect(() => {
    if (isCompactLayout && open && document.body.style.overflow !== 'hidden') {
      const prev = document.body.style.overflow

      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isCompactLayout, open])

  return (
    <MUIPopper
      open={open}
      container={container || picassoRootContainer}
      anchorEl={anchorEl}
      className={cx(classes.root, className)}
      popperRef={ref}
      popperOptions={getPopperOptions(popperOptions!, isCompactLayout)}
      style={{
        ...style,
        ...anchorElWidthStyle
      }}
      {...rest}
    >
      {children}
    </MUIPopper>
  )
})

Popper.defaultProps = {
  open: false,
  disablePortal: false,
  placement: 'bottom',
  popperOptions: {},
  autoWidth: true
}

Popper.displayName = 'Popper'

export default Popper
