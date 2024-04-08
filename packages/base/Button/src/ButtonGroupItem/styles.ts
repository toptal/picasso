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
  const classNames = []

  if (active || hovered || focused || disabled) {
    classNames.push('z-[1]')
  }

  if (!disabled) {
    classNames.push('active:z-[1] hover:z-[1] focus-visible:z-[1]')
  }

  return classNames
}
