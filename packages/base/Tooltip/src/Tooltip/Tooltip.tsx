import type {
  ReactNode,
  ReactElement,
  ChangeEvent,
  HTMLAttributes,
} from 'react'
import React, { forwardRef, useCallback, useRef, useState } from 'react'
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import type { BaseProps } from '@toptal/picasso-shared'
import type { PicassoSpacing } from '@toptal/picasso-provider'
import { SPACING_0, usePicassoRoot } from '@toptal/picasso-provider'
import { Typography } from '@toptal/picasso-typography'
import { useMultipleForwardRefs } from '@toptal/picasso-utils'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import type { ContainerValue } from './types'
import { createArrowClassNames, createPopupClassNames } from './styles'
import { getPositionerOffsets, splitPlacement } from './utils'
import { useTooltipState } from './use-tooltip-state'

export type DelayType = 'short' | 'long'

export type MaxWidthType = 'none' | 'default'

export type PlacementType =
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

export type OffsetType = {
  left?: PicassoSpacing
  top?: PicassoSpacing
}

const delayDurations: { [k in DelayType]: number } = {
  short: 200,
  long: 500,
}

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Trigger element for tooltip */
  children: ReactNode
  /** Content to be rendered inside tooltip */
  content?: ReactNode
  /** Where should the tooltip be positioned */
  placement?: PlacementType
  /** Called when tooltip is opened */
  onOpen?: (event: ChangeEvent<{}>) => void
  /** Called when tooltip is closed */
  onClose?: (event: ChangeEvent<{}>) => void
  /** Whether user can interact with tooltip content */
  interactive?: boolean
  /** Programatically control tooltip's visibility */
  open?: boolean
  /** Disables all listener */
  disableListeners?: boolean
  /** Allows tooltip to change its placement when it overflows */
  preventOverflow?: boolean
  /** Disable the portal behavior. The children stay within it's parent */
  disablePortal?: boolean
  /** A delay in showing the tooltip */
  delay?: DelayType
  /** Show a compact tooltip */
  compact?: boolean
  /** If `true`, the tooltip follow the cursor over the wrapped element. This prop exists in material-ui@5+ */
  followCursor?: boolean
  /** Max width of a tooltip */
  maxWidth?: MaxWidthType
  /** Called after the tooltip close transition finishes */
  onTransitionExiting?: () => void
  /** Called after the tooltip close transition finishes */
  onTransitionExited?: () => void
  /** Tooltip div ref */
  tooltipRef?: React.Ref<HTMLDivElement>
  /** A node, or a function that returns node. The container will have the portal children appended to it. */
  container?: ContainerValue
  /** Offset to allow shifting tooltip's position from left and top. */
  offset?: OffsetType
}

export const Tooltip = forwardRef<HTMLElement, Props>(
  (
    {
      preventOverflow = true,
      placement = 'top',
      disablePortal = false,
      maxWidth = 'default',
      delay = 'short',
      followCursor = false,
      offset = {
        left: SPACING_0,
        top: SPACING_0,
      },
      ...props
    },
    ref
  ) => {
    const {
      content,
      children,
      interactive,
      className,
      style,
      id,
      open,
      onOpen,
      onClose,
      onTransitionExiting,
      onTransitionExited,
      disableListeners,
      compact,
      tooltipRef,
      container,
      'data-private': dataPrivate,
      ...rest
    } = props

    const picassoRootContainer = usePicassoRoot()

    const {
      open: actualOpen,
      handleOpenChange,
      handleOpenChangeComplete,
      handleTriggerClick,
      handleTriggerTouchStart,
      handleTriggerTouchMove,
      handleTriggerTouchEnd,
      handleTriggerMouseOver,
      handleTriggerMouseMove,
      handleTriggerMouseLeave,
    } = useTooltipState({
      open,
      disableListeners,
      followCursor,
      openDelay: delayDurations[delay],
      onOpen,
      onClose,
      onTransitionExiting,
      onTransitionExited,
    })

    const [triggerParent, setTriggerParent] = useState<HTMLElement | null>(null)
    const triggerNodeRef = useRef<HTMLElement | null>(null)

    const trackTriggerParent = useCallback(
      (node: HTMLElement | null) => {
        if (disablePortal) {
          setTriggerParent(node?.parentElement ?? null)
        }
      },
      [disablePortal]
    )

    const setTriggerRef = useMultipleForwardRefs<HTMLElement | null>([
      ref,
      triggerNodeRef,
      trackTriggerParent,
    ])

    const { side, align } = splitPlacement(placement)
    const showArrow = !compact && !followCursor

    const { sideOffset, alignOffset } = getPositionerOffsets({
      side,
      showArrow,
      followCursor,
      compact: Boolean(compact),
      offset,
      anchorRef: triggerNodeRef,
    })

    const resolvedContainer = disablePortal
      ? triggerParent
      : (typeof container === 'function' ? container() : container) ??
        picassoRootContainer

    const triggerRest = rest as Omit<
      BaseTooltip.Trigger.Props,
      'className' | 'style' | 'disabled' | 'closeOnClick' | 'onClick' | 'render'
    >

    const positioner = (
      <BaseTooltip.Positioner
        ref={tooltipRef}
        anchor={followCursor ? undefined : triggerNodeRef}
        // Keep base-ui's full anchor tracking (ResizeObserver + layout-shift
        // IntersectionObserver + ancestorScroll). base-ui positions a frame
        // after mount (popper.js was synchronous), so a tooltip opened inside a
        // still-opening Dropdown/Autocomplete measures a pre-settle anchor; the
        // trackers re-measure it onto the settled geometry. Dropdown also emits
        // a settle-nudge once its scale-in animation lands (Dropdown.tsx
        // onTransitionEnd) — the transform taints the anchor rect while it
        // plays, and that nudge is what removes the ~4px jump. [PF-2224]
        // `z-tooltip` (1300) is required — without an explicit z-index a tooltip
        // opened inside a Dropdown stacks behind the menu. `data-[anchor-hidden]`
        // (base-ui sets it when floating-ui's hide middleware reports the anchor
        // is clipped or detached — e.g. a Dropdown scrolls its menu out of a
        // scroll container and hides it, collapsing the anchor's rect) hides the
        // popup, so it disappears with its anchor instead of stranding at the
        // collision corner. [PF-2224]
        className='z-tooltip data-[anchor-hidden]:hidden'
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        collisionAvoidance={
          preventOverflow ? undefined : { side: 'flip', align: 'none' }
        }
      >
        <BaseTooltip.Popup
          id={id}
          role='tooltip'
          className={twJoin(createPopupClassNames(Boolean(compact), maxWidth))}
        >
          {showArrow && (
            <BaseTooltip.Arrow className={twJoin(createArrowClassNames())} />
          )}
          <Typography
            data-private={dataPrivate}
            as='div'
            size='small'
            color='inherit'
          >
            {content}
          </Typography>
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    )

    return (
      <BaseTooltip.Provider delay={delayDurations[delay]} closeDelay={0}>
        <BaseTooltip.Root
          open={actualOpen}
          onOpenChange={handleOpenChange}
          onOpenChangeComplete={handleOpenChangeComplete}
          disableHoverablePopup={!interactive}
          trackCursorAxis={followCursor ? 'both' : 'none'}
        >
          <BaseTooltip.Trigger
            {...triggerRest}
            ref={setTriggerRef}
            className={className}
            style={style}
            aria-describedby={
              actualOpen && id ? id : triggerRest['aria-describedby']
            }
            disabled={disableListeners}
            closeOnClick={false}
            onClick={handleTriggerClick}
            // Tap-to-open (arms on touchstart, opens on touchend — a gesture
            // that scrolls past the tap slop is disarmed by touchmove). This
            // is also the open path for DISABLED anchors: a tap on a disabled
            // control dispatches touch events (which bubble to the trigger)
            // but never a synthetic click, so the onClick path above can't
            // open there (see useTooltipState). Compose with any
            // consumer-supplied handler rather than overriding it.
            onTouchStart={event => {
              triggerRest.onTouchStart?.(event)
              handleTriggerTouchStart(event)
            }}
            onTouchMove={event => {
              triggerRest.onTouchMove?.(event)
              handleTriggerTouchMove(event)
            }}
            onTouchEnd={event => {
              triggerRest.onTouchEnd?.(event)
              handleTriggerTouchEnd(event)
            }}
            onMouseOver={event => {
              triggerRest.onMouseOver?.(event)
              handleTriggerMouseOver(event)
            }}
            // followCursor dismiss-while-roaming (no-op otherwise; see
            // useTooltipState). Compose with any consumer-supplied handler.
            onMouseMove={event => {
              triggerRest.onMouseMove?.(event)
              handleTriggerMouseMove(event)
            }}
            onMouseLeave={event => {
              triggerRest.onMouseLeave?.(event)
              handleTriggerMouseLeave(event)
            }}
            render={children as ReactElement}
          />
          <BaseTooltip.Portal container={resolvedContainer ?? undefined}>
            {positioner}
          </BaseTooltip.Portal>
        </BaseTooltip.Root>
      </BaseTooltip.Provider>
    )
  }
)

Tooltip.displayName = 'Tooltip'

export default Tooltip
