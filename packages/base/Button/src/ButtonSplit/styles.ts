import type { SizeType } from '@toptal/picasso-shared'

export const createActionButtonClassNames = ({
  variant,
}: {
  variant?: 'primary' | 'secondary'
}) => {
  const classNames: string[] = ['transition-[color,background]']

  if (variant === 'primary') {
    classNames.push(
      'border-r border-l-0 border-y-0 border-solid border-blue-700'
    )
  }

  return classNames
}

const menuButtonSizeClassNames: Record<
  SizeType<'small' | 'medium' | 'large'>,
  string
> = {
  small: 'min-w-[1.5em] px-[0.25em]',
  medium: 'min-w-[2em] px-[0.5em]',
  large: 'min-w-[3em] px-[0.75em]',
}

export const createMenuButtonClassNames = ({
  variant,
  size,
  disabled,
}: {
  variant?: 'primary' | 'secondary'
  size: SizeType<'small' | 'medium' | 'large'>
  disabled?: boolean
}) => {
  const classNames: string[] = []

  if (variant === 'primary') {
    classNames.push('border-l border-r-0 border-y-0 border-solid')
    if (disabled) {
      classNames.push('border-gray-500')
    } else {
      classNames.push('border-blue-700')
    }
  }

  classNames.push(menuButtonSizeClassNames[size])

  return classNames
}
