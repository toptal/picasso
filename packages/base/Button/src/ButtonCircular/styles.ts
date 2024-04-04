import type { VariantType } from './ButtonCircular'

export const createRootClassNames = ({
  responsive,
}: {
  disabled?: boolean
  focused?: boolean
  hovered?: boolean
  active?: boolean
  loading?: boolean
  responsive?: boolean
}) => {
  const classNames = ['rounded-full', 'p-0']

  if (responsive) {
    classNames.push('w-[2.5em] h-[2.5em] xl:w-[1.5em] xl:h-[1.5em]')
  } else {
    classNames.push('w-[1.5em] h-[1.5em]')
  }

  return classNames
}

export const createVariantClassNames = (
  variant: VariantType,
  {
    disabled,
    focused,
    hovered,
    active,
  }: {
    disabled?: boolean
    focused?: boolean
    hovered?: boolean
    active?: boolean
  }
): string[] => {
  const variantClassNames = []

  switch (variant) {
    case 'primary':
      variantClassNames.push('border-none')
      variantClassNames.push('text-white')
      variantClassNames.push('visited:text-white')

      if (disabled) {
        variantClassNames.push('bg-gray-400')
      } else {
        variantClassNames.push('hover:bg-[#4269D6]')
        variantClassNames.push('active:bg-[#1A41AB]')

        variantClassNames.push(
          'focus-visible:shadow-[0_0_0_3px_rgba(32,78,207,0.48)]'
        )
        if (focused) {
          variantClassNames.push('shadow-[0_0_0_3px_rgba(32,78,207,0.48)]')
        }

        if (hovered) {
          variantClassNames.push('bg-[#4269D6]')
        } else if (active) {
          variantClassNames.push('bg-[#1A41AB]')
        } else {
          variantClassNames.push('bg-blue-500')
        }
      }
      break
    case 'flat':
      variantClassNames.push('border-none')
      variantClassNames.push('text-graphite-700')

      if (disabled) {
        variantClassNames.push('text-graphite-700')
        variantClassNames.push('opacity-[0.48]')
        variantClassNames.push('bg-transparent')
      } else {
        variantClassNames.push('hover:bg-gray-200')
        variantClassNames.push('active:bg-gray-400')

        variantClassNames.push(
          'focus-visible:shadow-[0_0_0_3px_rgba(32,78,207,0.48)]'
        )
        if (focused) {
          variantClassNames.push('shadow-[0_0_0_3px_rgba(32,78,207,0.48)]')
        }

        if (hovered) {
          variantClassNames.push('bg-gray-200')
        } else if (active) {
          variantClassNames.push('bg-gray-400')
        } else {
          variantClassNames.push('bg-transparent')
        }
      }
      break
    case 'transparent':
      variantClassNames.push('border-none')
      variantClassNames.push('text-white')

      if (disabled) {
        variantClassNames.push('text-white/[0.48]')
        variantClassNames.push('bg-transparent')
      } else {
        variantClassNames.push('hover:bg-white/[0.08]')
        variantClassNames.push('active:bg-white/[0.16]')

        variantClassNames.push(
          'focus-visible:shadow-[0_0_0_3px_rgba(255,255,255,0.48)]'
        )
        if (focused) {
          variantClassNames.push('shadow-[0_0_0_3px_rgba(255,255,255,0.48)]')
        }

        if (hovered) {
          variantClassNames.push('bg-white/[0.08]')
        } else if (active) {
          variantClassNames.push('bg-white/[0.16]')
        } else {
          variantClassNames.push('bg-transparent')
        }
      }

      break
  }

  return variantClassNames
}
