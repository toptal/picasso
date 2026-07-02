import type {
  ReactNode,
  ReactElement,
  ChangeEvent,
  HTMLAttributes,
} from 'react'
import React, { forwardRef, useCallback, useRef, useState } from 'react'
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import type { BaseProps } from '@toptal/picasso-shared'
import { pxFromRem, spacingToRem } from '@toptal/picasso-shared'
import type { PicassoSpacing } from '@toptal/picasso-provider'
import { SPACING_0, usePicassoRoot } from '@toptal/picasso-provider'
import { Typography } from '@toptal/picasso-typography'
import { useMultipleForwardRefs } from '@toptal/picasso-utils'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import type { ContainerValue } from './types'
import { createArrowClassNames, createPopupClassNames } from './styles'
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

type Side = 'top' | 'bottom' | 'left' | 'right'
type Align = 'start' | 'center' | 'end'

const delayDurations: { [k in DelayType]: number } = {
  short: 200,
  long: 500,
}

// Gap (in px) between the anchor and the popup along the side axis. The arrow
// gap matches the legacy MUI arrow-tooltip spacing (the arrow fills the gap).
const ARROW_GAP = 15
// Menu-item tooltips sit in a dense stack of options, where the standard
// ARROW_GAP lands the arrow tip in the dead strip between two rows and reads as
// pointing at the wrong option. Per design, the tip↔anchor gap on menu items is
// 0-4px (not ~8px), so a menu-item anchor uses a tighter gap that seats the
// arrow on the option it describes. Scoped to menu items only — every other
// anchor keeps ARROW_GAP. [PF-1994]
const MENU_ITEM_ARROW_GAP = 8
const COMPACT_GAP = 4
const FOLLOW_CURSOR_GAP = 10

// Menu items are recognized by the anchor's semantic (ARIA) role rather than
// by coupling to @toptal/picasso-menu — Menu.Item renders `role="menuitem"`,
// while look-alikes that must keep the standard gap don't (e.g. Autocomplete
// options render inside a Menu but as `role="option"`).
const isMenuItemAnchor = (anchor: Element | null): boolean =>
  anchor?.getAttribute('role') === 'menuitem'

const spacingToPx = (spacing: PicassoSpacing): number =>
  Number.parseFloat(pxFromRem(spacingToRem(spacing)))

const splitPlacement = (
  placement: PlacementType
): { side: Side; align: Align } => {
  const [side, alignPart] = placement.split('-') as [Side, string | undefined]

  const align: Align =
    alignPart === 'start' ? 'start' : alignPart === 'end' ? 'end' : 'center'

  return { side, align }
}

const getPositionerOffsets = ({
  side,
  showArrow,
  followCursor,
  offset,
  anchorRef,
}: {
  side: Side
  showArrow: boolean
  followCursor: boolean
  offset: OffsetType
  anchorRef: React.RefObject<HTMLElement | null>
}): { sideOffset: number | (() => number); alignOffset: number } => {
  // followCursor positions against the cursor with its own fixed distance;
  // the public `offset` prop only applies to anchor-relative placement.
  if (followCursor) {
    return { sideOffset: FOLLOW_CURSOR_GAP, alignOffset: 0 }
  }

  const isVertical = side === 'top' || side === 'bottom'
  const offsetLeft = spacingToPx(offset.left ?? SPACING_0)
  const offsetTop = spacingToPx(offset.top ?? SPACING_0)

  // A single, flip-invariant gap, as MUI's Popper applied it: the `offset`
  // modifier carried only the user offset and never varied by resolved side, so
  // the anchor↔popup gap is identical whether or not floating-ui flips.
  const userSideOffset = isVertical ? offsetTop : offsetLeft
  const alignOffset = isVertical ? offsetLeft : offsetTop

  if (!showArrow) {
    return { sideOffset: COMPACT_GAP + userSideOffset, alignOffset }
  }

  // The arrow gap depends on what the arrow points at (see
  // MENU_ITEM_ARROW_GAP), so it resolves lazily — base-ui calls an
  // offset function at position time, when the anchor node is already
  // committed. This keeps the first paint correct without tracking the
  // anchor in state (no extra render + reposition pass).
  return {
    sideOffset: () =>
      (isMenuItemAnchor(anchorRef.current) ? MENU_ITEM_ARROW_GAP : ARROW_GAP) +
      userSideOffset,
    alignOffset,
  }
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
      handleTriggerMouseOver,
      handleTriggerMouseLeave,
    } = useTooltipState({
      open,
      disableListeners,
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
            disabled={disableListeners}
            // Picasso owns click handling (toggle + dismiss-suppression), so
            // disable base-ui's built-in close-on-click.
            closeOnClick={false}
            onClick={handleTriggerClick}
            // Open on `mouseover` as a robust, bubbling complement to base-ui's
            // movement-based hover (see useTooltipState). Compose with any
            // consumer-supplied handler rather than overriding it.
            onMouseOver={event => {
              triggerRest.onMouseOver?.(event)
              handleTriggerMouseOver(event)
            }}
            onMouseLeave={event => {
              triggerRest.onMouseLeave?.(event)
              handleTriggerMouseLeave()
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
