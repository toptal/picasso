/**
 * Tailwind class strings for the notistack `SnackbarProvider` container slots
 * (its `classes` prop). `[&>div]` / `[&>div>div]` target notistack's internal
 * DOM: the per-anchor wrapper and each per-notification item inside it.
 */

// Header heights. `containerTopWithMargin` mirrors `headerHeight.default`;
// Tailwind can't read the value at runtime, so keep the class literal in sync.
export const headerHeight = { default: '4.5rem', smallAndMedium: '3rem' }

export const containerRoot = [
  '[&>div]:pointer-events-auto',
  '[&>div>div]:px-0',
  '[&>div>div]:py-[6px]',
  // Arbitrary property preserves the original `ease` timing: the
  // `transition-[padding]` utility would inject Tailwind's own easing curve.
  '[&>div>div]:[transition:padding_300ms_ease_0ms]',
].join(' ')

// Shown when a top bar is present without a drawer: offset notifications below
// the header (mirrors headerHeight.default = 4.5rem).
export const containerTopWithMargin = 'mt-[4.5rem]'
