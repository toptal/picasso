import type { ReactNode } from 'react'
import React, { forwardRef, useContext } from 'react'
import { Popper as MUIPopper } from '@material-ui/core'
import type { ReferenceObject, PopperOptions } from 'popper.js'
import type PopperJs from 'popper.js'
import type { BaseProps } from '@toptal/picasso-shared'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-shared'
import { usePicassoRoot, useBreakpoint } from '@toptal/picasso-provider'
import { useWidthOf } from '@toptal/picasso-utils'
import ModalContext from '@toptal/picasso-modal-context'
import { twMerge } from '@toptal/picasso-tailwind-merge'

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
  /** Always keep Popper's children in the DOM */
  keepMounted?: boolean
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
  /** Popper width */
  width?: string
  /** Take full window width on small and medium screens */
  enableCompactMode?: boolean
}

const getAnchorEl = (
  anchorEl: null | ReferenceObject | (() => ReferenceObject)
) => (typeof anchorEl === 'function' ? anchorEl() : anchorEl)

const getPreventOverflowOptions = (isInsideModal: boolean) => {
  if (isInsideModal) {
    return {
      boundariesElement: 'scrollParent',
      padding: 0,
    }
  }

  return {
    boundariesElement: 'viewport',
    padding: 5,
  }
}

export const getPopperOptions = (
  popperOptions: PopperOptions,
  isInsideModal = false
) => ({
  ...popperOptions,

  modifiers: {
    ...popperOptions.modifiers,
    flip: {
      enabled: true,
      ...popperOptions.modifiers?.flip,
    },
    preventOverflow: {
      enabled: true,
      ...getPreventOverflowOptions(isInsideModal),
      ...popperOptions.modifiers?.preventOverflow,
    },
  },
})

const useWidthStyle = ({
  anchorEl,
  autoWidth,
  width,
}: Pick<Props, 'anchorEl' | 'autoWidth' | 'width'>) => {
  const resolvedAnchorEl = getAnchorEl(anchorEl)
  const anchorElWidth = useWidthOf<ReferenceObject>(resolvedAnchorEl)

  if (width) {
    return { width }
  }

  if (autoWidth) {
    return { width: anchorElWidth }
  }

  return {}
}

export const Popper = forwardRef<PopperJs, Props>(function Popper(props, ref) {
  const {
    children,
    open,
    anchorEl,
    className,
    container,
    popperOptions = {},
    keepMounted,
    autoWidth,
    width,
    enableCompactMode,
    disablePortal,
    style,
    ...rest
  } = props

  const picassoRootContainer = usePicassoRoot()
  const isInsideModal = useContext(ModalContext)

  const isCompactLayoutResolution = useBreakpoint(['xs', 'sm', 'md'])
  const isCompactLayout = enableCompactMode && isCompactLayoutResolution
  const widthStyle = useWidthStyle({ autoWidth, width, anchorEl })
  const anchorElWidthStyle = !isCompactLayout && widthStyle

  useIsomorphicLayoutEffect(() => {
    if (isCompactLayout && open && document.body.style.overflow !== 'clip') {
      const prev = document.body.style.overflow

      document.body.style.overflow = 'clip'

      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isCompactLayout, open])

  const memoizedPopperOptions = React.useMemo(
    () => getPopperOptions(popperOptions, isInsideModal),
    [popperOptions, isInsideModal]
  )

  return (
    <MUIPopper
      open={open}
      container={container || picassoRootContainer}
      anchorEl={anchorEl}
      className={twMerge(
        'z-modal',
        'xs:max-md:w-screen xs:max-md:max-w-screen xs:max-md:p-0 xs:max-md:m-0',
        '[&[x-out-of-boundaries]]:hidden',
        className
      )}
      popperRef={ref}
      popperOptions={memoizedPopperOptions}
      disablePortal={disablePortal}
      keepMounted={keepMounted}
      style={{
        ...style,
        ...anchorElWidthStyle,
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
  autoWidth: true,
}

Popper.displayName = 'Popper'

export default Popper
