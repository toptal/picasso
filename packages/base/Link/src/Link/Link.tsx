import type { ReactNode, AnchorHTMLAttributes, ElementType } from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { BaseProps, OverridableComponent } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'

const supportedColors = ['white', 'blue'] as const
const supportedVariants = ['action', 'anchor'] as const

type VariantType = (typeof supportedVariants)[number]
type ColorType = (typeof supportedColors)[number]

const sanitizeRel = (rel: string | undefined, target: string | undefined) => {
  if (target !== '_blank') {
    return rel
  }

  if (!rel) {
    return 'noopener'
  }

  const isRelSafe = rel.includes('noreferrer') || rel.includes('noopener')

  return isRelSafe ? rel : rel.concat(' noopener')
}

const COLOR_DISABLED_MAP: Record<
  ColorType,
  Record<VariantType, Record<'disabled' | 'normal', string>>
> = {
  blue: {
    action: {
      disabled: 'text-blue-500 no-underline opacity-50 hover:!no-underline',
      normal: 'text-blue-500 visited:text-purple-500 no-underline',
    },
    anchor: {
      disabled: 'text-gray-600 underline',
      normal: 'text-blue-500 visited:text-purple-500 no-underline',
    },
  },
  white: {
    action: {
      disabled: 'text-gray-600',
      normal: 'inherit',
    },
    anchor: {
      disabled: 'text-gray-600 visited:text-gray-500 underline',
      normal: 'inherit text-white visited:text-gray-500 underline',
    },
  },
}

export type Props = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    /** Content of the component */
    children?: ReactNode
    /** Destination the link points to */
    href?: string
    /** Callback invoked when component is clicked */
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     */
    as?: ElementType<React.HTMLAttributes<HTMLElement>>
    /** Either it's a regular hyperlink or an _action_ */
    variant?: VariantType
    /** Controls color of the link */
    color?: ColorType
    /** Indicates the order of receiving focus. If not set will not receive focus. */
    tabIndex?: number
    /** Indicates that the user cannot interact with the Link or its children */
    disabled?: boolean

    visited?: boolean
    /**
     * If true, underline decoration never applies
     */
    noUnderline?: boolean
    'aria-disabled'?: boolean
  }

const defaultColor = 'blue'
const defaultVariant = 'anchor'

type ViewModel = {
  className: string
  href?: string
  target?: string
  color?: 'inherit'
  rel?: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  weight: 'inherit' | 'semibold'
  style?: React.CSSProperties
  tabIndex?: number
  as: Props['as']
  ariaDisabled?: boolean
  nativeHTMLAttributes: Omit<Props, keyof BaseProps>
}

/* eslint-disable complexity */
export const calculateViewModel = (props: Props): ViewModel => {
  const {
    href,
    onClick,
    className,
    as = 'a',
    color: inputColor = 'blue',
    style,
    variant: inputVariant = 'anchor',
    tabIndex,
    target,
    rel,
    disabled,
    visited = false,
    noUnderline,
    'aria-disabled': ariaDisabled,
    ...nativeHTMLAttributes
  } = props

  const sanitizedRel = sanitizeRel(rel, target)

  // When Link is used as={Link}, TypeScript can't ensure the input to the Link is compatible with its Props type.
  const color = supportedColors.includes(inputColor) ? inputColor : defaultColor
  const variant = supportedVariants.includes(inputVariant)
    ? inputVariant
    : defaultVariant

  return {
    className: twMerge(
      'focus:outline-none hover:underline leading-[inherit]',
      COLOR_DISABLED_MAP[color][variant][disabled ? 'disabled' : 'normal'],
      disabled ? 'cursor-not-allowed' : '',
      noUnderline ? '!no-underline' : '',
      visited
        ? color === 'blue'
          ? 'visited text-purple-500'
          : 'visited text-gray-500'
        : '',
      onClick || href ? 'cursor-pointer' : '',
      className
    ),
    href: disabled ? undefined : href,
    target: disabled ? undefined : target,
    rel: sanitizedRel,
    onClick: disabled ? undefined : onClick,
    weight: variant === 'action' ? 'semibold' : 'inherit',
    color: 'inherit',
    style,
    tabIndex,
    as,
    ariaDisabled: disabled || ariaDisabled,
    nativeHTMLAttributes,
  }
}

export const Link: OverridableComponent<Props> = forwardRef<
  HTMLAnchorElement,
  Props
>(function Link(
  {
    as = 'a',
    color = 'blue',
    variant = 'anchor',
    noUnderline = false,
    ...props
  },
  ref
) {
  const viewModel = calculateViewModel({
    ...props,
    as,
    color,
    variant,
    noUnderline,
  })

  return (
    <Typography
      {...viewModel.nativeHTMLAttributes}
      ref={ref}
      as={viewModel.as}
      // @ts-expect-error Typography is incompatible with href prop
      href={viewModel.href}
      target={viewModel.target}
      rel={viewModel.rel}
      onClick={viewModel.onClick}
      color={viewModel.color}
      weight={viewModel.weight}
      className={viewModel.className}
      style={viewModel.style}
      tabIndex={viewModel.tabIndex}
      aria-disabled={viewModel.ariaDisabled}
    >
      {props.children}
    </Typography>
  )
})

Link.displayName = 'Link'

export default Link
