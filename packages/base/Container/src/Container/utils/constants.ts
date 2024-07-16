type SizePrefix = 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type SpacingType = 'gap' | 'padded' | 'top' | 'bottom' | 'left' | 'right'

type SpacingClasses = {
  [key in SpacingType]: {
    [size in SizePrefix]: string
  }
}

type SpacingClassesMap = {
  [index: number]: SpacingClasses
}

const createSpacingClasses = (maxValue: number): SpacingClassesMap => {
  const spacingClasses: SpacingClassesMap = {}
  const sizes: SizePrefix[] = ['default', 'xs', 'sm', 'md', 'lg', 'xl']

  for (let i = 0; i <= maxValue; i++) {
    spacingClasses[i] = {
      gap: {},
      padded: {},
      top: {},
      bottom: {},
      left: {},
      right: {},
    } as SpacingClasses

    sizes.forEach(size => {
      const prefix = size === 'default' ? '' : `${size}:`

      spacingClasses[i].gap[size] = `${prefix}gap-${i}`
      spacingClasses[i].padded[size] = `${prefix}p-${i}`
      spacingClasses[i].top[size] = `${prefix}mt-${i}`
      spacingClasses[i].bottom[size] = `${prefix}mb-${i}`
      spacingClasses[i].left[size] = `${prefix}ml-${i}`
      spacingClasses[i].right[size] = `${prefix}mr-${i}`
    })
  }

  return spacingClasses
}

export const SPACING_CLASSES = createSpacingClasses(12)

export const DEPRECATED_CLASSES: { [key: string]: SpacingClasses } = {
  xsmall: SPACING_CLASSES[2],
  small: SPACING_CLASSES[4],
  medium: SPACING_CLASSES[6],
  large: SPACING_CLASSES[8],
  xlarge: SPACING_CLASSES[10],
} as const
