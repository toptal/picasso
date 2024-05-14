import type { SizeType } from '@toptal/picasso-shared'

export const createSizeClassNames = (
  size: 'small' | 'medium' | 'large'
): string => {
  const sizeClassNames: Record<
    SizeType<'small' | 'medium' | 'large'>,
    string
  > = {
    small: 'py-1 pr-4 pl-2',
    medium: 'py-2 pr-6 pl-4',
    large: 'py-4 pr-8 pl-4',
  }

  return sizeClassNames[size]
}

export const createContentSizeClassNames = (
  size: 'small' | 'medium' | 'large'
): string => {
  const sizeClassNames: Record<
    SizeType<'small' | 'medium' | 'large'>,
    string
  > = {
    small: 'min-w-12',
    medium: 'min-w-16',
    large: 'min-w-[5.25rem]',
  }

  return sizeClassNames[size]
}
