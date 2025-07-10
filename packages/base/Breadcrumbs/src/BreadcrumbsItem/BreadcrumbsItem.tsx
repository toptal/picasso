import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type {
  BaseProps,
  TextLabelProps,
  OverridableComponent,
} from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'
import { toTitleCase } from '@toptal/picasso-utils'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props
  extends BaseProps,
    TextLabelProps,
    HTMLAttributes<HTMLElement> {
  /** Component name to render the breadcrumbs item as */
  as?: ElementType
  /** Whether the item is active */
  active: boolean
}

const Active = (props: { children: ReactNode }) => {
  return <Typography weight='semibold' color='black' {...props} />
}

export const BreadcrumbsItem: OverridableComponent<Props> = forwardRef<
  HTMLElement,
  Props
>(function BreadcrumbsItem(
  {
    as = 'span',
    active,
    children,
    className,
    titleCase: propsTitleCase,
    ...rest
  },
  ref
) {
  const Component = active ? Active : as

  const titleCase = useTitleCase(propsTitleCase)

  return (
    <Component
      ref={ref}
      className={twMerge('text-[14px] font-semibold', className)}
      {...rest}
    >
      {titleCase ? toTitleCase(children) : children}
    </Component>
  )
})

BreadcrumbsItem.displayName = 'BreadcrumbsItem'

export default BreadcrumbsItem
