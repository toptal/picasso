import type { Theme } from '@material-ui/core/styles'
import type { SizeType } from '@toptal/picasso-shared'

import type { IconPositionType, VariantType } from './Button'

// @todo: remove in the next tickets
export const createOutlineCommons = ({ palette }: Theme) => ({
  color: palette.common.black,
  backgroundColor: palette.common.white,

  '&:hover, &$hovered': {
    borderColor: palette.common.black,
  },

  // when we use <Button as={Link} />
  '&&&:visited': {
    color: palette.common.black,
  },

  '&$disabled': {
    color: palette.grey.main,
    borderColor: palette.grey.main,
    backgroundColor: palette.common.white,
  },
})

// @todo: in the next tickets
export const activeGroup = ({ palette }: Theme) => ({
  backgroundColor: palette.grey.dark,
  borderColor: palette.grey.dark,
  color: palette.common.white,
})

// @todo: in the next tickets
export const disabledGroup = ({ palette }: Theme) => ({
  color: palette.grey.main,
  cursor: 'not-allowed',
  pointerEvents: 'all',
})

export const createSizeClassNames = (
  size: 'small' | 'medium' | 'large'
): string[] => {
  const sizeClassNames: Record<
    SizeType<'small' | 'medium' | 'large'>,
    string[]
  > = {
    small: ['min-w-14', 'h-6', 'py-0', 'px-3'],
    medium: ['min-w-16', 'h-8', 'py-0', 'px-4'],
    large: ['min-w-24', 'h-12', 'py-0', 'px-8'],
  }

  return sizeClassNames[size]
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

        if (hovered) {
          variantClassNames.push('bg-[#4269D6]')
        } else if (active) {
          variantClassNames.push('bg-[#1A41AB]')
        } else {
          variantClassNames.push('bg-blue-500')
        }
      }

      break
    case 'negative':
      variantClassNames.push('border-none')
      variantClassNames.push('text-white')
      variantClassNames.push('visited:text-white')

      if (disabled) {
        variantClassNames.push('bg-gray-400')
      } else {
        variantClassNames.push('hover:bg-[#DB466B]')
        variantClassNames.push('active:bg-[#B01F43]')

        if (hovered) {
          variantClassNames.push('bg-[#DB466B]')
        } else if (active) {
          variantClassNames.push('bg-[#B01F43]')
        } else {
          variantClassNames.push('bg-red-500')
        }
      }
      break
    case 'positive':
      variantClassNames.push('border-none')
      variantClassNames.push('text-white')
      variantClassNames.push('visited:text-white')

      if (disabled) {
        variantClassNames.push('bg-gray-400')
      } else {
        variantClassNames.push('hover:bg-[#27D496]')
        variantClassNames.push('active:bg-[#00A96C]')

        if (hovered) {
          variantClassNames.push('bg-[#27D496]')
        } else if (active) {
          variantClassNames.push('bg-[#00A96C]')
        } else {
          variantClassNames.push('bg-green-500')
        }
      }
      break
    case 'secondary':
      variantClassNames.push('border border-solid')

      if (disabled) {
        variantClassNames.push('text-gray-500')
        variantClassNames.push('border-gray-500')
        variantClassNames.push('bg-white')
      } else {
        variantClassNames.push('text-black')

        variantClassNames.push('hover:border-black')
        variantClassNames.push('visited:text-black')

        variantClassNames.push('active:bg-gray-200')
        variantClassNames.push('active:border-black')

        if (hovered) {
          variantClassNames.push('border-black')
          variantClassNames.push('bg-white')
        } else if (active) {
          variantClassNames.push('border-black')
          variantClassNames.push('bg-gray-200')
        } else {
          variantClassNames.push('bg-white')
          variantClassNames.push('border-gray-400')
        }
      }

      break
    case 'transparent':
      variantClassNames.push('border')
      if (disabled) {
        variantClassNames.push('text-white/[0.32]')
        variantClassNames.push('border-white/[0.32]')
        variantClassNames.push('bg-transparent')
      } else {
        variantClassNames.push('text-white')
        variantClassNames.push('visited:text-white')
        variantClassNames.push('border-solid')

        variantClassNames.push('hover:border-white')
        variantClassNames.push('active:border-white')
        variantClassNames.push('active:bg-white/[.16]')
        variantClassNames.push(
          'focus-visible:shadow-[0_0_0_3px_rgba(255,255,255,0.48)]'
        )

        if (hovered) {
          variantClassNames.push('border-white')
          variantClassNames.push('bg-transparent')
        } else if (active) {
          variantClassNames.push('border-white')
          variantClassNames.push('bg-white/[.16]')
        } else {
          variantClassNames.push('border-white/[0.32]')
          variantClassNames.push('bg-transparent')
        }

        if (focused) {
          variantClassNames.push('shadow-[0_0_0_3px_rgba(255,255,255,0.48)]')
        }
      }
      break
  }

  return variantClassNames
}

export const createCoreClassNames = ({
  disabled,
  focused,
  active,
}: {
  disabled?: boolean
  focused?: boolean
  hovered?: boolean
  active?: boolean
}): string[] => {
  const classNames = ['no-underline', 'rounded-sm', 'shadow-none']

  if (!disabled) {
    classNames.push('focus-visible:shadow-[0_0_0_3px_rgba(32,78,207,0.48)]')

    if (focused) {
      classNames.push('shadow-[0_0_0_3px_rgba(32,78,207,0.48)]')
    }

    if (active) {
      classNames.push('shadow-none')
    }
  }

  return classNames
}

export const createIconClassNames = ({
  iconPosition,
  size,
}: {
  iconPosition?: IconPositionType
  size: SizeType<'small' | 'medium' | 'large'>
}): string[] => {
  const sizeClassNames: Record<
    SizeType<'small' | 'medium' | 'large'>,
    string[]
  > = {
    small: [iconPosition === 'left' ? 'ml-[-0.125em]' : 'mr-[-0.125em]'],
    medium: [iconPosition === 'left' ? 'ml-[-0.25em]' : 'mr-[-0.25em]'],
    large: [iconPosition === 'left' ? 'ml-[-0.5em]' : 'mr-[-0.5em]'],
  }

  return [
    'text-[1.2em]',
    sizeClassNames[size].join(' '),
    iconPosition === 'left' ? 'mr-[0.5em]' : '',
    iconPosition === 'right' ? 'ml-[0.5em]' : '',
  ]
}
