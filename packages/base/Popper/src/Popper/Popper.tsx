import type { ReactNode } from 'react'
import React, { forwardRef, useContext, useEffect, useMemo } from 'react'
import { autoUpdate, FloatingPortal, useFloating } from '@floating-ui/react'
import type { BaseProps } from '@toptal/picasso-shared'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-shared'
import { usePicassoRoot, useBreakpoint } from '@toptal/picasso-provider'
import { useWidthOf } from '@toptal/picasso-utils'
import ModalContext from '@toptal/picasso-modal-context'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import type { PopperOptions } from './popper-options'
import {
  createMiddleware,
  getParityAttributes,
  getPopperOptions,
  resolveStrategy,
} from './popper-options'
import type { PopperHandle } from './use-popper-handle'
import { usePopperHandle } from './use-popper-handle'
import { usePopperLifecycle } from './use-popper-lifecycle'

export type {
  PopperModifierOptions,
  PopperModifiers,
  PopperOptions,
  PopperPadding,
} from './popper-options'
export type { PopperHandle } from './use-popper-handle'
export { getPopperOptions } from './popper-options'

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

/** Structural stand-in for popper.js v1's `ReferenceObject` */
export interface PopperReferenceObject {
  clientHeight: number
  clientWidth: number
  getBoundingClientRect: () => ClientRect
}

export interface Props extends BaseProps {
  children?: ReactNode
  /** if true, the popper is visible */
  open?: boolean
  /** Disable the portal behavior. The children stay within it's parent DOM hierarchy */
  disablePortal?: boolean
  /** Popper placement */
  placement?: PopperPlacementType
  /** Options provided to the popper instance */
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
  anchorEl: null | PopperReferenceObject | (() => PopperReferenceObject)
  /** Popper automatically resize to anchor element width */
  autoWidth?: boolean
  /** Popper width */
  width?: string
  /** Take full window width on small and medium screens */
  enableCompactMode?: boolean
}

const getAnchorEl = (
  anchorEl: null | PopperReferenceObject | (() => PopperReferenceObject)
) => (typeof anchorEl === 'function' ? anchorEl() : anchorEl)

const useWidthStyle = ({
  anchorEl,
  autoWidth,
  width,
}: Pick<Props, 'anchorEl' | 'autoWidth' | 'width'>) => {
  const resolvedAnchorEl = getAnchorEl(anchorEl)
  const anchorElWidth = useWidthOf<PopperReferenceObject>(resolvedAnchorEl)

  if (width) {
    return { width }
  }

  if (autoWidth) {
    return { width: anchorElWidth }
  }

  return {}
}

export const Popper = forwardRef<PopperHandle, Props>(function Popper(
  {
    open = false,
    disablePortal = false,
    placement = 'bottom',
    popperOptions = {},
    autoWidth = true,
    ...props
  },
  ref
) {
  const {
    children,
    anchorEl,
    className,
    container,
    keepMounted,
    width,
    enableCompactMode,
    style,
    ...rest
  } = props

  const picassoRootContainer = usePicassoRoot()
  const isInsideModal = useContext(ModalContext)

  const isCompactLayout = useBreakpoint(['xs', 'sm', 'md']) && enableCompactMode
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

  const resolvedOptions = useMemo(
    () => getPopperOptions(popperOptions, isInsideModal),
    [popperOptions, isInsideModal]
  )

  // PopperReferenceObject is the popper.js-era structural anchor type; real
  // DOM elements satisfy it and are what floating-ui receives at runtime
  const referenceEl = getAnchorEl(anchorEl) as Element | null

  const {
    refs,
    floatingStyles,
    middlewareData,
    isPositioned,
    update,
    x,
    y,
    placement: resolvedPlacement,
  } = useFloating({
    open,
    placement,
    strategy: resolveStrategy(popperOptions),
    // useFloating deep-compares middleware, so the inline array is stable
    middleware: createMiddleware(resolvedOptions),
    whileElementsMounted: autoUpdate,
    elements: {
      reference: referenceEl,
    },
  })

  // TODO [PF-2203]: Remove once Tooltip migrates off popper.js.
  // Transitional [PF-1994]: legacy popper.js-positioned descendants (the
  // pre-migration Tooltip) measure synchronously once and re-measure only on
  // scroll/resize. popper.js positioned synchronously, so an open Tooltip
  // mounted together with this popper used to latch correct coordinates;
  // floating-ui positions a frame later. Nudge legacy descendants via a
  // synthetic scroll whenever our geometry settles or changes. Remove when
  // Tooltip migrates off popper.js.
  useEffect(() => {
    if (open && isPositioned) {
      window.dispatchEvent(new Event('scroll'))
    }
  }, [open, isPositioned, x, y])

  usePopperLifecycle({
    open,
    ready: isPositioned,
    x,
    y,
    onCreate: resolvedOptions.onCreate,
    onUpdate: resolvedOptions.onUpdate,
  })

  const setFloatingRef = usePopperHandle(ref, refs.setFloating, update)

  const resolvedContainer = useMemo(
    () => (typeof container === 'function' ? container() : container),
    [container]
  )

  if (!open && !keepMounted) {
    return null
  }

  const popperNode = (
    <div
      ref={setFloatingRef}
      role='tooltip'
      className={twMerge(
        'z-modal',
        'xs:max-md:w-screen xs:max-md:max-w-screen xs:max-md:p-0 xs:max-md:m-0',
        '[&[x-out-of-boundaries]]:hidden',
        className
      )}
      style={{
        ...floatingStyles,
        ...style,
        ...anchorElWidthStyle,
        ...(!open && keepMounted ? { display: 'none' } : {}),
      }}
      {...getParityAttributes(resolvedPlacement, middlewareData)}
      {...rest}
    >
      {children}
    </div>
  )

  if (disablePortal) {
    return popperNode
  }

  // FloatingPortal treats an explicit `null` root as "wait for the container"
  // and renders nothing until it resolves, while `undefined` falls back to
  // `document.body` — degrade gracefully when the Picasso root is unavailable
  return (
    <FloatingPortal
      root={resolvedContainer ?? picassoRootContainer ?? undefined}
    >
      {popperNode}
    </FloatingPortal>
  )
})

Popper.displayName = 'Popper'

export default Popper
