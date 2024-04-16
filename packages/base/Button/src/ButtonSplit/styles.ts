import type { SizeType } from '@toptal/picasso-shared'
import { twMerge } from 'tailwind-merge'

export const createActionButtonClassNames = ({
  variant,
}: {
  variant?: 'primary' | 'secondary'
}) => {
  return twMerge(
    'transition-[color,background]',
    variant === 'primary' &&
      'border-r border-l-0 border-y-0 border-solid border-blue-700'
  )
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
  return twMerge(
    menuButtonSizeClassNames[size],
    variant === 'primary' && 'border-l border-r-0 border-y-0 border-solid',
    variant === 'primary' && disabled && 'border-gray-500',
    variant === 'primary' && !disabled && 'border-blue-700'
  )
}
