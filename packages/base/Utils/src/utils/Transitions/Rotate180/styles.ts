export const createRotate180ClassNames = (on: boolean): string[] => [
  'transition-transform',
  'duration-150',
  'ease-in-out',
  ...(on ? ['rotate-180'] : []),
]
