export const createRootClassNames = ({
  disabled,
  focused,
  hovered,
  active,
}: {
  disabled?: boolean
  focused?: boolean
  hovered?: boolean
  active?: boolean
  loading?: boolean
}): string[] => {
  const classNames = [
    'visited:text-black',
    'border-solid',
    'transition-[color,background]',
  ]

  if (active || hovered || focused || disabled) {
    classNames.push('z-[1]')
  }

  if (!disabled) {
    classNames.push('active:z-[1] hover:z-[1] focus-visible:z-[1]')
  }

  if (disabled) {
    classNames.push('cursor-not-allowed')
    classNames.push('text-gray-500')

    if (active) {
      classNames.push('bg-graphite-700 border-graphite-700')
    } else {
      classNames.push('border-gray-500')
    }
  } else {
    classNames.push(
      'active:z-[1] active:bg-graphite-700 active:border-graphite-700 active:text-white'
    )
    classNames.push('hover:z-[1] hover:border-black')
    classNames.push('focus-visible:z-[1]')

    if (hovered) {
      classNames.push('border-black text-black')
    } else if (active) {
      classNames.push('bg-graphite-700 border-graphite-700 text-white')
      classNames.push('shadow-none')
    } else {
      classNames.push('border-gray-400 text-black')
    }
  }

  return classNames
}
