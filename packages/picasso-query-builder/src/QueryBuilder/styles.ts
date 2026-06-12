/**
 * QueryBuilder root styling, ported from JSS to Tailwind arbitrary descendant
 * variants applied on the wrapping Container. Combined with the react-querybuilder
 * layout/branch styles from `query-builder-global-styles.ts`.
 *
 * Every entry is a complete static string literal so Tailwind's content scanner
 * picks it up — do NOT build these via interpolation.
 *
 * Token mapping (@toptal/picasso-provider palette → picasso-tailwind):
 *   grey.lightest #fcfcfc → gray-50 | grey.lighter #f3f4f6 → gray-100
 *   blue.main #204ecf → blue-500.
 */
import { queryBuilderGlobalStyles } from './query-builder-global-styles'

// Root element of the query builder (the wrapping Container).
const root: string[] = ['rounded-[0.5em]', 'bg-gray-100']

// Higher-specificity branch recoloring for the two shallowest nesting levels
// (blue.main → blue-500). Wins over the blue-400 connectors via the extra
// attribute selector specificity.
const branchLevelColor: string[] = [
  "[&_.query-builder-branches_.rule-group[data-level=1]]:before:content-['']",
  '[&_.query-builder-branches_.rule-group[data-level=1]]:before:border-blue-500',
  "[&_.query-builder-branches_.rule-group[data-level=1]]:after:content-['']",
  '[&_.query-builder-branches_.rule-group[data-level=1]]:after:border-blue-500',
  "[&_.query-builder-branches_.rule[data-level=1]]:before:content-['']",
  '[&_.query-builder-branches_.rule[data-level=1]]:before:border-blue-500',
  "[&_.query-builder-branches_.rule[data-level=1]]:after:content-['']",
  '[&_.query-builder-branches_.rule[data-level=1]]:after:border-blue-500',
  "[&_.query-builder-branches_.rule[data-level=2]]:before:content-['']",
  '[&_.query-builder-branches_.rule[data-level=2]]:before:border-blue-500',
  "[&_.query-builder-branches_.rule[data-level=2]]:after:content-['']",
  '[&_.query-builder-branches_.rule[data-level=2]]:after:border-blue-500',
  "[&_.query-builder-branches_.rule-group[data-level=2]]:before:content-['']",
  '[&_.query-builder-branches_.rule-group[data-level=2]]:before:border-blue-500',
  "[&_.query-builder-branches_.rule-group[data-level=2]]:after:content-['']",
  '[&_.query-builder-branches_.rule-group[data-level=2]]:after:border-blue-500',
]

// Alternating rule-group backgrounds by nesting depth (odd → white, even → gray-50).
// maxGroupDepth is hard-coded to 10 — matching the original JSS, which avoided
// reading the prop because dynamic keys broke under JSS.
const ruleGroupDepthBackground: string[] = [
  '[&_.rule-group[data-level=1]]:bg-white',
  '[&_.rule-group[data-level=2]]:bg-gray-50',
  '[&_.rule-group[data-level=3]]:bg-white',
  '[&_.rule-group[data-level=4]]:bg-gray-50',
  '[&_.rule-group[data-level=5]]:bg-white',
  '[&_.rule-group[data-level=6]]:bg-gray-50',
  '[&_.rule-group[data-level=7]]:bg-white',
  '[&_.rule-group[data-level=8]]:bg-gray-50',
  '[&_.rule-group[data-level=9]]:bg-white',
  '[&_.rule-group[data-level=10]]:bg-gray-50',
]

// Header alignment, control ordering, and button reset.
const headerControls: string[] = [
  '[&_.rule-group-header]:justify-end',
  '[&_.rule_button]:m-0',
  '[&_.rule-group-header_button]:m-0',

  // top-level group header order
  '[&_.rule-group[data-level=0]>.rule-group-header_.rule-group-combinator]:order-none',
  '[&_.rule-group[data-level=0]>.rule-group-header_.rule-group-add-group]:order-1',
  '[&_.rule-group[data-level=0]>.rule-group-header_.rule-group-add-rule]:order-2',

  // nested group header order
  '[&_.rule-group-body_.rule-group-header_.rule-group-combinator]:order-none',
  '[&_.rule-group-body_.rule-group-header_.rule-group-remove]:order-1',
  '[&_.rule-group-body_.rule-group-header_.rule-group-duplicate]:order-2',
  '[&_.rule-group-body_.rule-group-header_.rule-group-add-group]:order-3',
  '[&_.rule-group-body_.rule-group-header_.rule-group-add-rule]:order-4',
]

export const queryBuilderClassNames: string[] = [
  ...root,
  ...queryBuilderGlobalStyles,
  ...branchLevelColor,
  ...ruleGroupDepthBackground,
  ...headerControls,
]
