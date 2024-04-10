import type { ReactNode, HTMLAttributes, ElementType } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import type {
  StandardProps,
  ColorType,
  TextLabelProps,
  SizeType,
} from '@toptal/picasso-shared'
import { toTitleCase } from '@toptal/picasso-utils'

import variantToElement from './utils/variant-to-element'

const COLORS: Record<NonNullable<Props['color']>, string> = {
  green: 'text-green-600',
  red: 'text-red-500',
  yellow: 'text-yellow-500',
  'light-grey': 'text-gray-400',
  grey: 'text-gray-500',
  'grey-main-2': 'text-gray-600',
  'dark-grey': 'text-graphite-700',
  black: 'text-black',
  'light-blue': 'text-blue-400',
  inherit: 'text-inherit',
}
const WEIGHTS: Record<NonNullable<Props['weight']>, string> = {
  regular: 'font-regular',
  semibold: 'font-semibold',
  inherit: 'font-inherit-weight',
}

const ALIGN: Record<NonNullable<Props['align']>, string> = {
  inherit: 'text-align-inherit',
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
}

const UNDERLINE: Record<NonNullable<Props['underline']>, string> = {
  solid: 'underline decoration-solid',
  dashed: 'underline decoration-dashed',
}

const VARIANT_WEIGHT: Record<
  NonNullable<Props['variant']>,
  Record<NonNullable<Props['size']>, string>
> = {
  heading: {
    xxsmall: 'font-semibold',
    xsmall: 'font-regular',
    small: 'font-semibold',
    medium: 'font-semibold',
    large: 'font-semibold',
    xlarge: 'font-semibold',
    inherit: 'font-regular',
  },
  body: {
    xxsmall: 'font-regular',
    xsmall: 'font-regular',
    small: 'font-regular',
    medium: 'font-regular',
    large: 'font-regular',
    xlarge: 'font-regular',
    inherit: 'font-regular',
  },
}

const VARIANT_SIZE: Record<
  NonNullable<Props['variant']>,
  Record<NonNullable<Props['size']>, string>
> = {
  heading: {
    xxsmall: 'text-2xs',
    xsmall: 'text-md',
    small: 'text-md',
    medium: 'text-lg',
    large: 'text-xl',
    xlarge: 'text-2xl',
    inherit: 'text-md',
  },
  body: {
    xxsmall: 'text-2xs',
    xsmall: 'text-xxs',
    small: 'text-sm',
    medium: 'text-md',
    large: 'text-lg',
    xlarge: 'text-md',
    inherit: 'font-inherit-size leading-[1.5em]',
  },
}
const VARIANT_COLOR: Record<
  NonNullable<Props['variant']>,
  Record<NonNullable<Props['size']>, string>
> = {
  heading: {
    xxsmall: 'text-black',
    xsmall: 'text-graphite-700',
    small: 'text-black',
    medium: 'text-black',
    large: 'text-black',
    xlarge: 'text-black',
    inherit: 'text-graphite-700',
  },
  body: {
    xxsmall: 'text-graphite-700',
    xsmall: 'text-graphite-700',
    small: 'text-graphite-700',
    medium: 'text-graphite-700',
    large: 'text-black',
    xlarge: 'text-graphite-700',
    inherit: 'text-graphite-700',
  },
}

export type TypographyAlign =
  | 'inherit'
  | 'left'
  | 'center'
  | 'right'
  | 'justify'

export interface Props
  extends StandardProps,
    TextLabelProps,
    HTMLAttributes<HTMLElement> {
  /** Font variant for inner text */
  variant?: 'heading' | 'body'
  /** Text content */
  children?: ReactNode
  /** Controls whether the Typography is inline or not */
  inline?: boolean
  /** Text align of the inner text */
  align?: TypographyAlign
  /** Size of the inner text */
  size?:
    | SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'>
    | 'inherit'
  /** Font weight of the inner text */
  weight?: 'regular' | 'semibold' | 'inherit'
  /** Invert color */
  invert?: boolean
  /** Text color */
  color?: ColorType
  /** Enable ellipsis for overflowing text */
  noWrap?: boolean
  /** Rendered HTML markup */
  as?: React.ElementType<React.HTMLAttributes<HTMLElement>>
  /** Controls when the Typography should have an underline */
  underline?: 'solid' | 'dashed'
  /** Controls when the Typography should have line through */
  lineThrough?: boolean
}

export const Typography = forwardRef<HTMLElement, Props>(function Typography(
  props,
  ref
) {
  const {
    align,
    as,
    children,
    className,
    color,
    inline,
    invert,
    lineThrough,
    noWrap,
    size = 'inherit',
    style,
    titleCase,
    underline,
    variant = 'body',
    weight,
    ...rest
  } = props

  const Component: ElementType = as || variantToElement(variant, size)

  const getColor = () => {
    if (invert) {
      return 'text-white'
    }
    if (color) {
      return COLORS[color]
    }

    return VARIANT_COLOR[variant][size]
  }

  return (
    <Component
      ref={ref}
      className={cx(
        'm-0',
        VARIANT_SIZE[variant][size],
        getColor(),
        weight ? WEIGHTS[weight] : VARIANT_WEIGHT[variant][size],
        align ? ALIGN[align] : undefined,
        underline ? UNDERLINE[underline] : undefined,
        noWrap
          ? 'whitespace-nowrap overflow-ellipsis overflow-hidden'
          : undefined,
        lineThrough ? 'line-through' : undefined,
        inline ? 'inline' : undefined,
        className
      )}
      style={style}
      {...rest}
    >
      {titleCase ? toTitleCase(children) : children}
    </Component>
  )
})

Typography.defaultProps = {
  inline: false,
  noWrap: false,
  size: 'inherit',
  variant: 'body',
}

Typography.displayName = 'Typography'

export default Typography
