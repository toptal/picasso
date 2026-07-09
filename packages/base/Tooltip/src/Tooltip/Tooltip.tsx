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

    // base-ui's Positioner requires a Portal ancestor, so `disablePortal` is
    // emulated by portaling the popup into the trigger's parent element —
    // keeping it within the same DOM subtree as before.
    const [triggerParent, setTriggerParent] = useState<HTMLElement | null>(null)
    // The rendered trigger element — base-ui merges the trigger props onto
    // `children`, so this is the anchor node (e.g. a Menu.Item's `<li>`).
    // Read lazily by getPositionerOffsets to pick the arrow gap.
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

    // base-ui's Trigger renders the (button-like) child, so its event-handler
    // props are typed against that element, while `rest` carries the public
    // HTMLAttributes<HTMLDivElement> surface. Bridge the element-variance once
    // here rather than narrowing the public Props (code-standards.md §"TS variance").
    const triggerRest = rest as Omit<
      BaseTooltip.Trigger.Props,
      'className' | 'style' | 'disabled' | 'closeOnClick' | 'onClick' | 'render'
    >

    const positioner = (
      <BaseTooltip.Positioner
        ref={tooltipRef}
        // Pin the anchor to the trigger's ref'd node. Left alone, base-ui
        // anchors the ACTIVE trigger — the element whose hover handler
        // reported the open. For composite children that attach the forwarded
        // ref and the spread props to DIFFERENT nodes (Radio/Checkbox with a
        // label: ref → the root <label>, props → the inner ButtonBase), the
        // anchor then depends on which handler path fired (base-ui's React
        // prop on the inner node vs its native listener on the ref'd node) —
        // an interaction-order-dependent popup jump of the two nodes' rect
        // difference. The legacy MUI Tooltip always anchored its Popper to
        // the child's ref'd node; pin the same node. followCursor keeps the
        // default so cursor tracking owns the reference point.
        anchor={followCursor ? undefined : triggerNodeRef}
        // Restore the tooltip stacking layer (`z-tooltip` = 1300) that MUI's
        // Tooltip applied via `theme.zIndex.tooltip` (Picasso overrode MUI's
        // 1500 default to 1300 — see PicassoProvider). base-ui sets no z-index,
        // so without this the popup renders at the default layer (0) and a
        // tooltip opened inside a Dropdown stacks behind the menu. At 1300 it
        // sits at the same layer as Popper-based overlays (`z-modal`) and wins
        // by DOM order — the popup portal mounts after the menu — exactly as
        // the MUI Tooltip did.
        className='z-tooltip'
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        // MUI's `preventOverflow={false}` disabled only Popper's `preventOverflow`
        // + `hide` modifiers (the cross-/main-axis SHIFT) — the `flip` modifier
        // stayed on, so an edge-anchored tooltip still flipped to stay visible.
        // Mirror that: keep side-flip, drop the align-shift. (`{ side: 'none' }`
        // would disable flip too, rendering the popup off-screen — and off the
        // captured page in Happo.)
        collisionAvoidance={
          preventOverflow ? undefined : { side: 'flip', align: 'none' }
        }
      >
        <BaseTooltip.Popup
          // The consumer `id` addresses the popup, as the legacy MUI Tooltip
          // put it on the popper (not the trigger). base-ui reads the popup's
          // own DOM id for its aria wiring (`useRole` floatingId = the popup
          // element's id), so setting it here also points the trigger's
          // auto `aria-describedby` at this id — restoring the full legacy link.
          id={id}
          // Expose `role="tooltip"` on the popup as the legacy MUI Tooltip did.
          // base-ui marks the positioner `role="presentation"` and links the
          // trigger via `aria-describedby` instead, so without this there is no
          // `role="tooltip"` node — breaking consumers and a11y checks that
          // query it (e.g. Tabs' truncation tooltip: `getByRole('tooltip')`).
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
            // Legacy MUI Tooltip forwarded `className`/`style`/`...rest` to the
            // trigger (the cloned child), not the popup — preserve that so the
            // consumer's public API stays unchanged.
            className={className}
            style={style}
            // Describe the trigger with the popup while open, as the legacy MUI
            // Tooltip did (it set `aria-describedby` on the child pointing at
            // the popper's id). base-ui's Tooltip has no `useRole`, so it never
            // wires this itself; with `id` routed to `Tooltip.Popup`, point the
            // trigger at that id here. Falls back to any consumer-supplied
            // value when closed or when no `id` was given.
            aria-describedby={
              actualOpen && id ? id : triggerRest['aria-describedby']
            }
            disabled={disableListeners}
            // Picasso owns click handling (toggle + dismiss-suppression), so
            // disable base-ui's built-in close-on-click.
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
            // Open on `mouseover` as a robust, bubbling complement to base-ui's
            // movement-based hover (see useTooltipState). Compose with any
            // consumer-supplied handler rather than overriding it.
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
