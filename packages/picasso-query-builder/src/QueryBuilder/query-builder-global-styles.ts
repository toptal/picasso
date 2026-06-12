/**
 * Layout + drag-and-drop + branch-connector styling for react-querybuilder's
 * generated DOM, ported from JSS to Tailwind arbitrary descendant variants.
 *
 * These styles originally lived in react-querybuilder's CSS file; they were moved
 * into the codebase to dodge a CDN-caching production bug (ER-28394). They target
 * react-querybuilder's standard classnames (`.ruleGroup`, `.rule`, `.betweenRules`,
 * `.dndOver`, `.queryBuilder-branches`, …) as descendants of the QueryBuilder root.
 *
 * Every entry is a complete static string literal so Tailwind's content scanner
 * picks it up — do NOT build these via interpolation.
 *
 * Token mapping (@toptal/picasso-provider palette → picasso-tailwind):
 *   common.white #fff → white | grey.light2 #d8d9dc → gray-400
 *   blue.light #25a9ef → blue-400 | purple.main #6727cf → purple-500
 *   green.lighter #eafbf5 → green-100
 * Spacing: SPACING_6 1.5rem (p-6) | SPACING_4 1rem (gap-4/ml-6) | SPACING_2 0.5rem (pb-2).
 * Branch geometry literals preserved verbatim (0.75rem indent, 0.0625rem hairline).
 */

const layout: string[] = [
  '[&_.ruleGroup]:flex',
  '[&_.ruleGroup]:flex-col',
  '[&_.ruleGroup]:gap-4',
  '[&_.ruleGroup]:p-6',
  '[&_.ruleGroup]:border',
  '[&_.ruleGroup]:border-solid',
  '[&_.ruleGroup]:border-gray-400',
  '[&_.ruleGroup]:rounded-md',
  '[&_.ruleGroup]:bg-white',
  '[&_.ruleGroup]:-m-px',

  '[&_.ruleGroup_.ruleGroup-body]:flex',
  '[&_.ruleGroup_.ruleGroup-body]:flex-col',
  '[&_.ruleGroup_.ruleGroup-body]:gap-4',
  '[&_.ruleGroup_.ruleGroup-body:empty]:hidden',

  '[&_.ruleGroup_.ruleGroup-header]:flex',
  '[&_.ruleGroup_.ruleGroup-header]:gap-4',
  '[&_.ruleGroup_.ruleGroup-header]:items-center',
  '[&_.ruleGroup_.rule]:flex',
  '[&_.ruleGroup_.rule]:gap-4',
  '[&_.ruleGroup_.rule]:items-center',
  '[&_.ruleGroup_.rule]:flex-wrap',
  // The legacy `.rule-value-list-item` rule used an invalid `margineft` property
  // (a typo) and therefore never applied; dropped to preserve behavioral parity.
]

const dndHover: string[] = [
  // inline combinators disabled → purple drop line (green when copying)
  '[&_[data-inlinecombinators=disabled]_.dndOver.rule]:border-b-2',
  '[&_[data-inlinecombinators=disabled]_.dndOver.rule]:[border-bottom-style:dashed]',
  '[&_[data-inlinecombinators=disabled]_.dndOver.rule]:border-b-purple-500',
  '[&_[data-inlinecombinators=disabled]_.dndOver.rule]:pb-2',
  '[&_[data-inlinecombinators=disabled]_.dndOver.ruleGroup-header]:border-b-2',
  '[&_[data-inlinecombinators=disabled]_.dndOver.ruleGroup-header]:[border-bottom-style:dashed]',
  '[&_[data-inlinecombinators=disabled]_.dndOver.ruleGroup-header]:border-b-purple-500',
  '[&_[data-inlinecombinators=disabled]_.dndOver.ruleGroup-header]:pb-2',
  '[&_[data-inlinecombinators=disabled]_.dndOver.rule.dndCopy]:border-b-green-100',
  '[&_[data-inlinecombinators=disabled]_.dndOver.ruleGroup-header.dndCopy]:border-b-green-100',

  // inline combinators enabled → green drop line
  '[&_[data-inlinecombinators=enabled]_.dndOver.rule:last-child]:border-b-2',
  '[&_[data-inlinecombinators=enabled]_.dndOver.rule:last-child]:[border-bottom-style:dashed]',
  '[&_[data-inlinecombinators=enabled]_.dndOver.rule:last-child]:border-b-green-100',
  '[&_[data-inlinecombinators=enabled]_.dndOver.rule:last-child]:pb-2',
  '[&_[data-inlinecombinators=enabled]_.dndOver.ruleGroup-header]:border-b-2',
  '[&_[data-inlinecombinators=enabled]_.dndOver.ruleGroup-header]:[border-bottom-style:dashed]',
  '[&_[data-inlinecombinators=enabled]_.dndOver.ruleGroup-header]:border-b-green-100',
  '[&_[data-inlinecombinators=enabled]_.dndOver.ruleGroup-header]:pb-2',
  '[&_[data-inlinecombinators=enabled]_.dndOver.rule+.betweenRules]:border-b-2',
  '[&_[data-inlinecombinators=enabled]_.dndOver.rule+.betweenRules]:[border-bottom-style:dashed]',
  '[&_[data-inlinecombinators=enabled]_.dndOver.rule+.betweenRules]:border-b-green-100',
  '[&_[data-inlinecombinators=enabled]_.dndOver.rule+.betweenRules]:pb-2',
  '[&_[data-inlinecombinators=enabled]_.dndOver.betweenRules]:border-b-2',
  '[&_[data-inlinecombinators=enabled]_.dndOver.betweenRules]:[border-bottom-style:dashed]',
  '[&_[data-inlinecombinators=enabled]_.dndOver.betweenRules]:border-b-green-100',
  '[&_[data-inlinecombinators=enabled]_.dndOver.betweenRules]:pb-2',
]

const dndDrag: string[] = [
  '[&_.ruleGroup.dndDragging]:opacity-50',
  '[&_.rule.dndDragging]:opacity-50',
  '[&_.ruleGroup_.queryBuilder-dragHandle]:cursor-move',
  '[&_.rule_.queryBuilder-dragHandle]:cursor-move',
  '[&_[data-dnd=disabled]_.queryBuilder-dragHandle]:hidden',
]

// Branch connector lines (::before / ::after) around nested rules and groups.
const branches: string[] = [
  '[&_.queryBuilder-branches_.ruleGroup-body]:ml-6',

  // `.rule` connectors
  '[&_.queryBuilder-branches_.rule]:relative',
  "[&_.queryBuilder-branches_.rule]:before:content-['']",
  '[&_.queryBuilder-branches_.rule]:before:absolute',
  '[&_.queryBuilder-branches_.rule]:before:w-3',
  '[&_.queryBuilder-branches_.rule]:before:-left-4',
  '[&_.queryBuilder-branches_.rule]:before:border-blue-400',
  '[&_.queryBuilder-branches_.rule]:before:border-solid',
  '[&_.queryBuilder-branches_.rule]:before:rounded-none',
  '[&_.queryBuilder-branches_.rule]:before:-top-4',
  '[&_.queryBuilder-branches_.rule]:before:[height:calc(50%_+_1rem)]',
  '[&_.queryBuilder-branches_.rule]:before:[border-width:0_0_0.0625rem_0.0625rem]',
  "[&_.queryBuilder-branches_.rule]:after:content-['']",
  '[&_.queryBuilder-branches_.rule]:after:absolute',
  '[&_.queryBuilder-branches_.rule]:after:w-3',
  '[&_.queryBuilder-branches_.rule]:after:-left-4',
  '[&_.queryBuilder-branches_.rule]:after:border-blue-400',
  '[&_.queryBuilder-branches_.rule]:after:border-solid',
  '[&_.queryBuilder-branches_.rule]:after:rounded-none',
  '[&_.queryBuilder-branches_.rule]:after:top-1/2',
  '[&_.queryBuilder-branches_.rule]:after:h-1/2',
  '[&_.queryBuilder-branches_.rule]:after:[border-width:0_0_0_0.0625rem]',
  '[&_.queryBuilder-branches_.rule:last-child]:before:rounded-bl-none',
  '[&_.queryBuilder-branches_.rule:last-child]:after:hidden',

  // nested `.ruleGroup .ruleGroup` connectors (calc offsets applied)
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:relative',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:p-4',
  "[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:before:content-['']",
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:before:absolute',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:before:w-3',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:before:[left:calc(-1rem_-_0.0625rem)]',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:before:border-blue-400',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:before:border-solid',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:before:rounded-none',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:before:[top:calc(-1rem_-_0.0625rem)]',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:before:[height:calc(50%_+_1rem_+_0.0625rem)]',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:before:[border-width:0_0_0.0625rem_0.0625rem]',
  "[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:after:content-['']",
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:after:absolute',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:after:w-3',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:after:[left:calc(-1rem_-_0.0625rem)]',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:after:border-blue-400',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:after:border-solid',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:after:rounded-none',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:after:top-1/2',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:after:[height:calc(50%_+_0.0625rem)]',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup]:after:[border-width:0_0_0_0.0625rem]',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup:last-child]:before:rounded-bl-none',
  '[&_.queryBuilder-branches_.ruleGroup_.ruleGroup:last-child]:after:hidden',

  // `.betweenRules` connector (single ::before)
  '[&_.queryBuilder-branches_.betweenRules]:relative',
  "[&_.queryBuilder-branches_.betweenRules]:before:content-['']",
  '[&_.queryBuilder-branches_.betweenRules]:before:absolute',
  '[&_.queryBuilder-branches_.betweenRules]:before:w-3',
  '[&_.queryBuilder-branches_.betweenRules]:before:[left:calc(-0.75rem_-_0.0625rem)]',
  '[&_.queryBuilder-branches_.betweenRules]:before:border-gray-400',
  '[&_.queryBuilder-branches_.betweenRules]:before:border-solid',
  '[&_.queryBuilder-branches_.betweenRules]:before:rounded-none',
  '[&_.queryBuilder-branches_.betweenRules]:before:top-4',
  '[&_.queryBuilder-branches_.betweenRules]:before:[height:calc(100%_+_1rem)]',
  '[&_.queryBuilder-branches_.betweenRules]:before:[border-width:0_0_0_0.0625rem]',
]

export const queryBuilderGlobalStyles: string[] = [
  ...layout,
  ...dndHover,
  ...dndDrag,
  ...branches,
]
