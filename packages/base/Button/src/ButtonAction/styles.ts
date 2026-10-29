import { FOCUS_RING } from '@toptal/picasso-shared'

import type { IconPositionType } from '../ButtonBase'

export const createRootClassNames = ({
  disabled,
  focused,
  hovered,
  active,
  loading,
}: {
  disabled?: boolean
  focused?: boolean
  hovered?: boolean
  active?: boolean
  loading?: boolean
}) => {
  const classNames = ['border-none', 'px-0', 'bg-transparent', 'h-[1.5em]']

  if (disabled) {
    classNames.push('opacity-[.48]')

    return classNames
  }

  if (loading) {
    classNames.push('no-underline')
    classNames.push('!cursor-default')
  } else {
    classNames.push('hover:text-blue-500')
    classNames.push('hover:underline')
    classNames.push('active:text-blue-500')
    classNames.push('active:underline')

    if (hovered || active) {
      classNames.push('text-blue-500')
      classNames.push('underline')
    }
  }

  // A loading button can still be focused
  classNames.push(FOCUS_RING.blue.focusVisible)
  classNames.push('focus-visible:rounded-sm')

  if (focused) {
    classNames.push(FOCUS_RING.blue.focused)
    classNames.push('rounded-sm')
  }

  return classNames
}

export const createIconClassNames = ({
  iconPosition,
}: {
  iconPosition?: IconPositionType
}): string[] => {
  return [
    'w-4',
    'h-4',
    'text-graphite-700',
    iconPosition === 'left' ? 'mr-[0.5rem]' : '',
    iconPosition === 'right' ? 'ml-[0.5rem]' : '',
  ]
}
