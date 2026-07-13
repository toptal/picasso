import type {
  ReactNode,
  ReactElement,
  ChangeEvent,
  HTMLAttributes,
} from 'react'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import type { BaseProps } from '@toptal/picasso-shared'
import type { PicassoSpacing } from '@toptal/picasso-provider'
import { SPACING_0, usePicassoRoot } from '@toptal/picasso-provider'
import { Typography } from '@toptal/picasso-typography'
import { useMultipleForwardRefs } from '@toptal/picasso-utils'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import type { ContainerValue } from './types'
import { createArrowClassNames, createPopupClassNames } from './styles'
import {
  getPositionerOffsets,
  getSettledAnchorRect,
  isMenuItemAnchor,
  splitPlacement,
} from './utils'
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

// A process-wide counter for fallback tooltip ids (see useFallbackId), mirroring
// MUI v4's unstable_useId which Picasso relied on pre-migration.
let fallbackIdCounter = 0

// base-ui's Tooltip wires no `aria-describedby` of its own (it runs
// `useInteractions([dismiss, clientPoint])` with no `useRole`), whereas MUI v4
// generated a fallback id and linked trigger→popup so screen readers announce
// the tooltip as the trigger's description. Re-add that association: when the
// consumer supplies no `id`, generate a stable one after mount and use it for
// BOTH the popup's `id` and the trigger's `aria-describedby`. Assigning it in an
// effect keeps it SSR-safe (the server renders no id, the client fills it in —
// no hydration mismatch), exactly as MUI's unstable_useId did. [PF-2224]
const useFallbackId = (idProp?: string): string | undefined => {
  const [fallbackId, setFallbackId] = useState(idProp)

  useEffect(() => {
    if (fallbackId == null) {
      fallbackIdCounter += 1
      setFallbackId(`picasso-tooltip-${fallbackIdCounter}`)
    }
  }, [fallbackId])

  return idProp ?? fallbackId
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
  /** Called when the tooltip close transition starts */
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

    // Non-empty even when the consumer omits `id` (see useFallbackId), so the
    // popup↔trigger aria-describedby link below always holds.
    const tooltipId = useFallbackId(id)

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
    const [anchorIsMenuItem, setAnchorIsMenuItem] = useState(false)
    const [triggerMounted, setTriggerMounted] = useState(false)
    const triggerNodeRef = useRef<HTMLElement | null>(null)

    const trackTriggerParent = useCallback(
      (node: HTMLElement | null) => {
        if (disablePortal) {
          setTriggerParent(node?.parentElement ?? null)
        }
      },
      [disablePortal]
    )

    // Mirror the anchor's menu-item-ness into state so `disableAnchorTracking`
    // (below) is correct on the render that matters. A `open`-from-mount tooltip
    // (e.g. the Dropdown story) commits its Positioner before the trigger ref
    // callback runs, so a bare `triggerNodeRef.current` read would still be null;
    // the state update re-renders once the node is committed.
    //
    // `triggerMounted` additionally gates the base-ui Root `open` (below) so a
    // tooltip that is `open` from its very first render still plays its enter
    // fade. base-ui's useTransitionStatus initializes `mounted` to `open` and
    // only enters the `'starting'` phase on a false→true transition, so an
    // open-at-mount Root never gets `data-starting-style` and the popup pops in
    // at full opacity. Master (MUI Grow, `appear: true`) faded such tooltips in.
    // The ref callback's setState flushes before paint, so this adds no visible
    // delay. [PF-2224]
    const trackAnchorRole = useCallback((node: HTMLElement | null) => {
      setAnchorIsMenuItem(isMenuItemAnchor(node))
      setTriggerMounted(node !== null)
    }, [])

    const setTriggerRef = useMultipleForwardRefs<HTMLElement | null>([
      ref,
      triggerNodeRef,
      trackTriggerParent,
      trackAnchorRole,
    ])

    // A menu-item anchor sits inside the Dropdown's Paper, which reveals with a
    // ~200ms scale-in — and a mid-scale ancestor taints the anchor's
    // getBoundingClientRect, so base-ui's entrance solve would land the popup
    // ~4px off and it would visibly re-position once the animation settles.
    // This virtual anchor feeds base-ui the anchor's SETTLED rect instead
    // (reconstructed from transform-independent layout metrics, see
    // getSettledAnchorRect), so the first solve already lands on the final
    // position and nothing moves afterwards. `contextElement` keeps
    // floating-ui's ancestorScroll/hide plumbing attached to the real anchor
    // node (autoUpdate and the hide middleware unwrap it), so scroll
    // re-solving and data-[anchor-hidden] behave exactly as with an element
    // anchor. Outside the scale animation the virtual rect IS the live
    // getBoundingClientRect, so steady-state behavior is unchanged. [PF-2224]
    const settledAnchor = useMemo(
      () => ({
        get contextElement() {
          return triggerNodeRef.current ?? undefined
        },
        getBoundingClientRect: () =>
          getSettledAnchorRect(triggerNodeRef.current),
      }),
      []
    )

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
        anchor={
          followCursor
            ? undefined
            : anchorIsMenuItem
            ? settledAnchor
            : triggerNodeRef
        }
        // `disableAnchorTracking` gates ONLY base-ui's ResizeObserver
        // (elementResize) + layout-shift IntersectionObserver (layoutShift);
        // ancestorScroll stays on. We disable it for menu-item anchors
        // (Dropdown) but keep full tracking everywhere else (Autocomplete
        // options, buttons, …). Why scoped: the layout-shift IntersectionObserver
        // re-solves the popup on ANY anchor movement, including a late sub-pixel
        // reflow (a web font settling ~1s after paint nudges the option row a
        // pixel), so the tooltip visibly chases it — a jump master's popper.js
        // never had (it re-solved only on scroll/resize, not pure reflows). The
        // Dropdown doesn't need that tracking: `settledAnchor` (above) already
        // positions the popup on the option's true post-animation rect from the
        // very first solve, so there is no taint drift for the observers to
        // correct. Autocomplete has no scale-in container but does reflow, so it
        // keeps the observers. A global flag here regressed Autocomplete before;
        // the fix belongs at the offending container (menu items). [PF-2224]
        // `z-tooltip` (1300) is required — without an explicit z-index a tooltip
        // opened inside a Dropdown stacks behind the menu. `data-[anchor-hidden]`
        // (base-ui sets it when floating-ui's hide middleware reports the anchor
        // is clipped or detached — e.g. a Dropdown scrolls its menu out of a
        // scroll container and hides it, collapsing the anchor's rect) hides the
        // popup, so it disappears with its anchor instead of stranding at the
        // collision corner; still driven by ancestorScroll, so it works even with
        // anchor tracking disabled. It MUST be `invisible` (visibility:hidden),
        // NOT `hidden` (display:none): a `display:none` popup measures 0×0, and
        // the NEXT position solve then reads that collapsed size and slams the
        // popup to a garbage coordinate (a visible teleport on open, since the
        // hide middleware transiently flags anchor-hidden before the Dropdown's
        // own popper finishes positioning). `visibility:hidden` keeps the rect
        // measurable so the solve stays correct. [PF-2224]
        disableAnchorTracking={anchorIsMenuItem}
        className='z-tooltip data-[anchor-hidden]:invisible'
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        collisionAvoidance={
          preventOverflow ? undefined : { side: 'flip', align: 'none' }
        }
      >
        <BaseTooltip.Popup
          id={tooltipId}
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
          // `&& triggerMounted` defers an open-at-mount `open` by one
          // pre-paint commit so base-ui sees a false→true transition and
          // plays the enter fade (see trackAnchorRole above). Hover/tap opens
          // always happen with the trigger long mounted, so they're
          // unaffected. [PF-2224]
          open={actualOpen && triggerMounted}
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
            // Associate the popup with the trigger while open (matching MUI v4),
            // preferring any consumer-supplied value (tooltipId is never empty).
            aria-describedby={
              triggerRest['aria-describedby'] ??
              (actualOpen ? tooltipId : undefined)
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
