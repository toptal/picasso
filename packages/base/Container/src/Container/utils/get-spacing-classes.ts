import type { SpacingType } from '@toptal/picasso-provider';
import { isPicassoSpacing, isResponsiveSpacing } from '@toptal/picasso-provider'

export const SPACING_CLASSES = {
  base: {
    0: {
      gap: 'gap-0',
      padded: 'p-0',
      top: 'mt-0',
      bottom: 'mb-0',
      left: 'ml-0',
      right: 'mr-0',
    },
    1: {
      gap: 'gap-1',
      padded: 'p-1',
      top: 'mt-1',
      bottom: 'mb-1',
      left: 'ml-1',
      right: 'mr-1',
    },
    2: {
      gap: 'gap-2',
      padded: 'p-2',
      top: 'mt-2',
      bottom: 'mb-2',
      left: 'ml-2',
      right: 'mr-2',
    },
    3: {
      gap: 'gap-3',
      padded: 'p-3',
      top: 'mt-3',
      bottom: 'mb-3',
      left: 'ml-3',
      right: 'mr-3',
    },
    4: {
      gap: 'gap-4',
      padded: 'p-4',
      top: 'mt-4',
      bottom: 'mb-4',
      left: 'ml-4',
      right: 'mr-4',
    },
    6: {
      gap: 'gap-6',
      padded: 'p-6',
      top: 'mt-6',
      bottom: 'mb-6',
      left: 'ml-6',
      right: 'mr-6',
    },
    8: {
      gap: 'gap-8',
      padded: 'p-8',
      top: 'mt-8',
      bottom: 'mb-8',
      left: 'ml-8',
      right: 'mr-8',
    },
    10: {
      gap: 'gap-10',
      padded: 'p-10',
      top: 'mt-10',
      bottom: 'mb-10',
      left: 'ml-10',
      right: 'mr-10',
    },
    12: {
      gap: 'gap-12',
      padded: 'p-12',
      top: 'mt-12',
      bottom: 'mb-12',
      left: 'ml-12',
      right: 'mr-12',
    },
  },
  deprecated: {
    xsmall: {
      gap: 'gap-2',
      padded: 'p-2',
      top: 'mt-2',
      bottom: 'mb-2',
      left: 'ml-2',
      right: 'mr-2',
    },
    small: {
      gap: 'gap-4',
      padded: 'p-4',
      top: 'mt-4',
      bottom: 'mb-4',
      left: 'ml-4',
      right: 'mr-4',
    },
    medium: {
      gap: 'gap-6',
      padded: 'p-6',
      top: 'mt-6',
      bottom: 'mb-6',
      left: 'ml-6',
      right: 'mr-6',
    },
    large: {
      gap: 'gap-8',
      padded: 'p-8',
      top: 'mt-8',
      bottom: 'mb-8',
      left: 'ml-8',
      right: 'mr-8',
    },
    xlarge: {
      gap: 'gap-10',
      padded: 'p-10',
      top: 'mt-10',
      bottom: 'mb-10',
      left: 'ml-10',
      right: 'mr-10',
    },
  },
} as const

type GetSpacingClassProps = {
  gap?: SpacingType
  padded?: SpacingType
  top?: SpacingType
  bottom?: SpacingType
  right?: SpacingType
  left?: SpacingType
}

export const getMappedClass = (spacing: SpacingType | undefined, type: keyof GetSpacingClassProps) => {
  if (!spacing || typeof spacing === 'number') {
    return
  }

  if (isPicassoSpacing(spacing)) {
    const { baseTokenIndex } = spacing

    return SPACING_CLASSES.base[baseTokenIndex][type] || ''
  }

  if (typeof spacing === 'string') {
    return SPACING_CLASSES.deprecated[spacing] || ''
  }

  if (isResponsiveSpacing(spacing)) {
    // TODO check if responsive
  }
}

export const getSpacingClasses = ({
  gap,
  padded,
  top,
  bottom,
  right,
  left,
}: GetSpacingClassProps) => {
  return [
    getMappedClass(gap, 'gap'),
    getMappedClass(padded, 'padded'),
    getMappedClass(top, 'top'),
    getMappedClass(bottom, 'bottom'),
    getMappedClass(right, 'right'),
    getMappedClass(left, 'left'),
  ]
}

export const getGapStyle = (gapSpacing?: SpacingType) => {
  if (!gapSpacing || typeof gapSpacing !== 'number') {
    return
  }

  return {
    gap: `${gapSpacing}rem`,
  }
}

export default getSpacingClasses