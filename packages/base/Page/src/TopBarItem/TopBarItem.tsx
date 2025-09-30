import type {
  BaseProps,
  TextLabelProps,
  OverridableComponent,
} from '@toptal/picasso-shared'
import type { ElementType, ReactElement } from 'react'
import React, { forwardRef, memo } from 'react'
import type { MenuItemProps } from '@toptal/picasso-menu'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import { noop } from '@toptal/picasso-utils'

import { SidebarItem } from '../SidebarItem'

export interface Props extends BaseProps, TextLabelProps {
  /** Pass icon to be used as part of item */
  icon?: ReactElement
  /** Highlights the item as selected */
  selected?: boolean
  /** Component name to render the menu item as */
  as?: ElementType<MenuItemProps>
  /** Callback when item is clicked */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  /** Callback when item is hovered */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const rootClasses = [
  'min-[1280px]:text-gray-600 min-[1280px]:p-0 min-[1280px]:h-auto',
  'min-[1280px]:w-auto min-[1280px]:m-0 min-[1280px]:flex-auto',
  'min-[1280px]:[&_p]:text-sm',
]
const separatorClasses = [
  'min-[1280px]:before:[&:not(:first-child)]:content-[""]',
  'min-[1280px]:before:bg-gray-600 min-[1280px]:before:inline-block',
  'min-[1280px]:before:h-2 min-[1280px]:before:mx-2 min-[1280px]:before:w-[1px]',
]
const bgClasses =
  'min-[1280px]:hover:bg-transparent min-[1280px]:focus:bg-transparent'
const textColorClasses =
  'min-[1280px]:hover:text-gray-400 min-[1280px]:hover:text-white'

export const TopBarItem: OverridableComponent<Props> = memo(
  forwardRef<HTMLElement, Props>(function TopBarItem(
    { onClick = noop, selected = false, ...props },
    ref
  ) {
    const { className, icon } = props

    return (
      <SidebarItem
        {...props}
        onClick={onClick}
        selected={selected}
        className={twMerge(
          rootClasses,
          separatorClasses,
          bgClasses,
          textColorClasses,
          icon && 'min-[1280px]:[&_svg]:w-[1em]',
          selected && 'min-[1280px]:bg-transparent min-[1280px]:text-white',
          className
        )}
        ref={ref}
      />
    )
  })
)

TopBarItem.displayName = 'TopBarItem'

export default TopBarItem
