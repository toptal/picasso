export type SlideDirection = 'up' | 'down' | 'left' | 'right'

const hiddenClassByDirection: Record<SlideDirection, string> = {
  right: '-translate-x-full',
  left: 'translate-x-full',
  up: 'translate-y-full',
  down: '-translate-y-full',
}

const shownClassByDirection: Record<SlideDirection, string> = {
  right: 'translate-x-0',
  left: 'translate-x-0',
  up: 'translate-y-0',
  down: 'translate-y-0',
}

export const createTranslateClassNames = (
  direction: SlideDirection,
  shown: boolean
): string =>
  shown ? shownClassByDirection[direction] : hiddenClassByDirection[direction]
