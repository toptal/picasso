// These animate opacity along with the child's other transitions
const BROAD_TRANSITIONS = ['transition', 'transition-all']

/**
 * Fade's transition utility, which goes after the child's className so the
 * fade replaces a `transition-*` utility of the child's, unless the child's
 * is a broad one that animates opacity too
 */
export const createTransitionClassName = (childClassName = '') =>
  childClassName.split(/\s+/).some(name => BROAD_TRANSITIONS.includes(name))
    ? undefined
    : 'transition-opacity'
