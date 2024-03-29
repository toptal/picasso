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
  const classNames = ['border-none', 'px-0', 'bg-transparent']

  if (disabled) {
    classNames.push('opacity-[.48]')
  } else if (loading) {
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

    classNames.push('focus-visible:shadow-[0_0_0_3px_rgba(32,78,207,0.48)]')
    classNames.push('focus-visible:rounded-sm')

    if (focused) {
      classNames.push('shadow-[0_0_0_3px_rgba(32,78,207,0.48)]')
      classNames.push('rounded-sm')
    }
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
