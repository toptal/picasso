import { flip, hide, offset, shift } from '@floating-ui/react'
import type {
  Boundary,
  Middleware,
  MiddlewareData,
  Padding,
  Placement,
  RootBoundary,
} from '@floating-ui/react'

/** Per-side padding, popper.js v1 shape */
export interface PopperPadding {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

/** Base options shared by all modifiers, popper.js v1 shape */
export interface PopperModifierOptions {
  /** Whether the modifier is applied */
  enabled?: boolean
}

/** Modifier configuration, popper.js v1 shape, mapped internally to `@floating-ui/react` middleware */
export interface PopperModifiers {
  /** Flip the popper to the opposite side when it overflows its boundary */
  flip?: PopperModifierOptions & {
    padding?: number | PopperPadding
    boundariesElement?: string | Element
    behavior?: string | string[]
  }
  /** Skidding and distance offsets in popper.js v1 `"<skidding>, <distance>"` format */
  offset?: PopperModifierOptions & {
    offset?: number | string
  }
  /** Keep the popper inside its overflow boundary */
  preventOverflow?: PopperModifierOptions & {
    padding?: number | PopperPadding
    boundariesElement?: string | Element
    escapeWithReference?: boolean
    priority?: string[]
  }
  /** Hide the popper when its reference is out of boundaries */
  hide?: PopperModifierOptions
}

// `data: never` keeps both `() => void` and popper.js v1-typed callbacks
// (`(data: Data) => void`) assignable under strictFunctionTypes; the
// component invokes them with no arguments
/** Callback invoked on popper lifecycle events */
export type PopperLifecycleCallback = (data: never) => void

/** Positioning options, popper.js v1 shape, mapped internally to `@floating-ui/react` */
export interface PopperOptions {
  /** Modifier configuration */
  modifiers?: PopperModifiers
  /** Called once the popper has been created and positioned */
  onCreate?: PopperLifecycleCallback
  /** Called on each position update after creation */
  onUpdate?: PopperLifecycleCallback
}

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
): PopperOptions => ({
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

// popper.js v1 offset format: "<skidding>, <distance>" (e.g. '-10px,6px') or
// a single skidding number. Maps to floating-ui's crossAxis/mainAxis.
const parsePopperOffset = (value: number | string) => {
  if (typeof value === 'number') {
    return { crossAxis: value, mainAxis: 0 }
  }

  const [skidding = '0', distance = '0'] = value.split(',')

  return {
    crossAxis: parseFloat(skidding) || 0,
    mainAxis: parseFloat(distance) || 0,
  }
}

const getBoundaryOptions = (
  boundariesElement?: string | Element
): { boundary?: Boundary; rootBoundary?: RootBoundary } => {
  if (boundariesElement && typeof boundariesElement === 'object') {
    return { boundary: boundariesElement }
  }

  if (boundariesElement === 'window') {
    return { rootBoundary: 'document' }
  }

  // 'viewport' and 'scrollParent' both resolve via floating-ui's default
  // clipping-ancestors + viewport overflow detection
  return {}
}

export const createMiddleware = (options: PopperOptions): Middleware[] => {
  const { modifiers = {} } = options
  const middleware: Middleware[] = []

  if (
    modifiers.offset?.enabled !== false &&
    modifiers.offset?.offset != null
  ) {
    middleware.push(offset(parsePopperOffset(modifiers.offset.offset)))
  }

  if (modifiers.flip?.enabled !== false) {
    middleware.push(
      flip({
        ...getBoundaryOptions(modifiers.flip?.boundariesElement),
        padding: modifiers.flip?.padding as Padding | undefined,
      })
    )
  }

  if (modifiers.preventOverflow?.enabled !== false) {
    middleware.push(
      shift({
        ...getBoundaryOptions(modifiers.preventOverflow?.boundariesElement),
        padding: modifiers.preventOverflow?.padding as Padding | undefined,
      })
    )
  }

  if (modifiers.hide?.enabled !== false) {
    middleware.push(hide())
  }

  return middleware
}

// popper.js v1 emitted these attributes; the component's own
// `[&[x-out-of-boundaries]]:hidden` class and consumer CSS select on them
export const getParityAttributes = (
  resolvedPlacement: Placement,
  middlewareData: MiddlewareData
): Record<string, string> => ({
  'x-placement': resolvedPlacement,
  ...(middlewareData.hide?.referenceHidden
    ? { 'x-out-of-boundaries': '' }
    : {}),
})
