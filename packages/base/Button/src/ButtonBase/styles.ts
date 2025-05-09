export const createCoreClassNames = ({
  disabled,
  loading,
}: {
  disabled?: boolean
  focused?: boolean
  loading?: boolean
}): string[] => {
  const classNames = [
    'text-lg',
    'inline-flex',
    'items-center',
    'justify-center',
    'select-none',
    'appearance-none',
    'm-0',
    'relative',
    'normal-case',
    'align-middle',
    'transition-colors',
    'duration-350',
    'ease-out',
    'shrink-0',
    'outline-none',
    '[[data-component-type="button"]+&]:ml-4',
  ]

  if (!disabled && !loading) {
    classNames.push('cursor-pointer')
  } else {
    classNames.push('cursor-default')
    classNames.push('pointer-events-none')
  }

  return classNames
}
