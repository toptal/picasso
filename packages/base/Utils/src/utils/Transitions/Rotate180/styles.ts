// `ease-in-out` resolves to cubic-bezier(0.4, 0, 0.2, 1) and `duration-150`
// matches the legacy `theme.transitions.duration.short` (150ms) JSS transition.
export const createRotate180ClassNames = (on: boolean): string[] => [
  'transition-transform',
  'duration-150',
  'ease-in-out',
  ...(on ? ['rotate-180'] : []),
]
