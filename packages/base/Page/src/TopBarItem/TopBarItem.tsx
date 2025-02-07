import type {
  BaseProps,
  TextLabelProps,
  OverridableComponent,
} from '@toptal/picasso-shared'
import type { ElementType, ReactElement } from 'react'
import React, { forwardRef, memo } from 'react'
import type { MenuItemProps } from '@material-ui/core/MenuItem'
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
  'lg:text-gray-600 lg:p-0 lg:h-auto',
  'lg:w-auto lg:m-0 lg:flex-auto',
  'lg:[&_p]:text-sm',
]
const separatorClasses = [
  'lg:before:[&:not(:first-child)]:content-[""]',
  'lg:before:bg-gray-600 lg:before:inline-block',
  'lg:before:h-2 lg:before:mx-2 lg:before:w-[1px]',
]
const bgClasses = 'lg:hover:bg-transparent lg:focus:bg-transparent'
const textColorClasses = 'lg:hover:text-gray-400 lg:hover:text-white'

export const TopBarItem: OverridableComponent<Props> = memo(
  forwardRef<HTMLElement, Props>(function TopBarItem(props, ref) {
    const { className, icon } = props

    return (
      <SidebarItem
        {...props}
        className={twMerge(
          rootClasses,
          separatorClasses,
          bgClasses,
          textColorClasses,
          icon && 'lg:[&_svg]:w-[1em]',
          props.selected && 'lg:bg-transparent lg:text-white',
          className
        )}
        ref={ref}
      />
    )
  })
)

TopBarItem.defaultProps = {
  onClick: noop,
  selected: false,
}

TopBarItem.displayName = 'TopBarItem'

export default TopBarItem
