import type { ElementType, HTMLAttributes, MouseEvent, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type {
  OverridableComponent,
  ColorType,
  BaseProps,
  TextLabelProps,
} from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'
import { toTitleCase, isString } from '@toptal/picasso-utils'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import type { Alignment, BlockWidth } from '../OverviewBlockGroup/settings'
import { useOverviewBlockGroupContext } from '../OverviewBlockGroup/OverviewBlockGroupContext'

type VariantColorType = Extract<ColorType, 'red' | 'green' | 'yellow'>

type Variant = `value-${VariantColorType}` | `label-${VariantColorType}`

type ColorSchema = {
  value: ColorType
  label: ColorType
}

export type Props = BaseProps &
  TextLabelProps &
  Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> & {
    /** Counter value  */
    value: ReactNode
    /** Counter title  */
    label: ReactNode
    /** The color variant  */
    variant?: Variant
    /** Component used for the root node. Either a string to use a DOM element or a component. */
    as?: ElementType
    /** Callback invoked when component is clicked */
    onClick?: (event: MouseEvent) => void
  }

const getAlignmentClassnames = (alignment: Alignment) => {
  switch (alignment) {
    case 'center':
      return 'items-center'
    case 'default':
    default:
      return 'items-start'
  }
}

const getBlockWidthClassnames = (blockWidth: BlockWidth) => {
  switch (blockWidth) {
    case 'narrow':
      return 'p-3 px-4'
    case 'regular':
      return 'p-3 px-6'
    case 'wide':
      return 'p-3 px-8'
  }
}

export const OverviewBlock: OverridableComponent<Props> = forwardRef<
  HTMLButtonElement,
  Props
>(function OverviewBlock({ as = 'button', ...props }, ref) {
  const {
    value,
    label,
    variant,
    className,
    onClick,
    titleCase: propsTitleCase,
    ...rest
  } = props

  const { align, blockWidth } = useOverviewBlockGroupContext()

  const color: ColorSchema = {
    value: 'black',
    label: 'dark-grey',
  }

  if (variant) {
    const [partName, colorName] = variant.split('-') as [
      keyof ColorSchema,
      ColorType
    ]

    color[partName] = colorName
  }

  const isClickable = Boolean(onClick) || typeof as !== 'string'

  const Component = isClickable && as ? as : 'div'

  const titleCase = useTitleCase(propsTitleCase)

  return (
    <Component
      {...rest}
      ref={ref}
      className={twMerge(
        isClickable
          ? 'cursor-pointer outline-none hover:bg-blue-100'
          : 'outline-none',
        getAlignmentClassnames(align),
        getBlockWidthClassnames(blockWidth),
        'flex flex-col bg-white m-0 min-w-[9.375rem] border-none no-underline',
        '[&:not(:first-child)]:border-0 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-solid [&:not(:first-child)]:border-gray-400',
        className
      )}
      onClick={onClick}
    >
      <Container align='left'>
        {isString(label) ? (
          <Typography size='xxsmall' weight='semibold' color={color.label}>
            {titleCase ? toTitleCase(label) : label}
          </Typography>
        ) : (
          label
        )}
        <Typography size='large' weight='semibold' color={color.value}>
          {value}
        </Typography>
      </Container>
    </Component>
  )
})

OverviewBlock.displayName = 'OverviewBlock'

export default OverviewBlock
