export type SlideDirection = 'up' | 'down' | 'left' | 'right'

/** Where the child waits while hidden, over a `translate-*` of its own */
export const hiddenClassByDirection: Record<SlideDirection, string> = {
  right: '-translate-x-full',
  left: 'translate-x-full',
  up: 'translate-y-full',
  down: '-translate-y-full',
}

/** Where the child rests while shown, unless it has a `translate-*` of its own */
export const shownClassByDirection: Record<SlideDirection, string> = {
  right: 'translate-x-0',
  left: 'translate-x-0',
  up: 'translate-y-0',
  down: 'translate-y-0',
}

// These animate translate along with the child's other transitions
const BROAD_TRANSITIONS = ['transition', 'transition-all']

/**
 * Slide's transition utility, which goes after the child's className so the
 * slide replaces a `transition-*` utility of the child's, unless the child's
 * is a broad one that animates translate too. In Tailwind v4,
 * `transition-transform` also covers the standalone `translate` property
 */
export const createTransitionClassName = (childClassName = '') =>
  childClassName.split(/\s+/).some(name => BROAD_TRANSITIONS.includes(name))
    ? undefined
    : 'transition-transform'
