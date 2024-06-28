import type { Size, Props } from './types'

export const classesBySize: Record<Size, string> = {
  small: 'text-xxs leading-4',
  medium: 'text-md leading-4',
  large: 'text-lg leading-4',
}

export const fontColorClasses = {
  dark: 'text-white',
  disabled: [
    'text-gray-600',
    // On Safari the text gets a bit lighter as if it had some transparency applied to it
    // We need this webkit-specific property to achieve the exact font color
    '[&::-webkit-text-fill-color]:text-gray-600',
  ] as string[],
  default: 'text-black',
  timepicker: 'text-black',
}

export const getFontColorClass = ({
  isDark,
  disabled,
  type,
  inputPropsDisabled,
}: {
  isDark: boolean
  disabled?: boolean
  type?: string
  inputPropsDisabled?: boolean
}) => {
  if (isDark) {
    return fontColorClasses.dark
  }

  if (type === 'time' && inputPropsDisabled) {
    // It's a special case for TimePicker
    return fontColorClasses.timepicker
  }

  if (disabled) {
    return fontColorClasses.disabled
  }

  return fontColorClasses.default
}

export const placeholderClasses = {
  default: ['([&::placeholder]:text-gray-600)', '[&::placeholder]:opacity-100'],
  dark: ['[&::placeholder]:text-white', '[&::placeholder]:opacity-[0.64]'],
}

export const inputClasses = [
  '[&::-webkit-calendar-picker-indicator]:bg-none',
  'bg-transparent',
  'border-none',
  'box-border',
  'cursor-[inherit]',
  'h-full',
  'outline-none',
  'p-0',
  'peer',
  'resize-none',
  'resize-none',
  'w-full',
]

export const getInputClassName = ({
  size,
  disabled,
  isDark,
  multiline,
  multilineResizable,
  type,
  inputProps,
}: Partial<Props> & { isDark: boolean; size: Size }) => [
  inputClasses,
  classesBySize[size],
  getFontColorClass({
    isDark,
    disabled,
    type,
    inputPropsDisabled: inputProps?.disabled,
  }),
  isDark ? placeholderClasses.dark : placeholderClasses.default,
  multiline && multilineResizable && 'resize-y',
]
