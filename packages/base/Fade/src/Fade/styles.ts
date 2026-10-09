// These animate opacity along with the child's other transitions, or turn
// transitions off on purpose
const KEPT_CHILD_TRANSITIONS = [
  'transition',
  'transition-all',
  'transition-none',
]

/**
 * Fade's transition utility, which goes after the child's className so the
 * fade replaces a `transition-*` utility of the child's, unless the child's
 * animates opacity too or turns transitions off
 */
export const createTransitionClassName = (childClassName = '') =>
  childClassName
    .split(/\s+/)
    .some(name => KEPT_CHILD_TRANSITIONS.includes(name))
    ? undefined
    : 'transition-opacity'
