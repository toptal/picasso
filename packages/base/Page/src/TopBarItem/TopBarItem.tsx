import type {
  BaseProps,
  TextLabelProps,
  OverridableComponent,
} from '@toptal/picasso-shared'
import type { ElementType, ReactElement } from 'react'
import React, { forwardRef, memo } from 'react'
import type { MenuItemProps } from '@material-ui/core/MenuItem'
import { twJoin, twMerge } from 'tailwind-merge'
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

const rootClasses = twJoin(
  'lgPage:text-gray-600 lgPage:p-0 lgPage:h-auto',
  'lgPage:w-auto lgPage:m-0 lgPage:flex-auto',
  'lgPage:[&_p]:text-sm'
)

const separatorClasses = twJoin(
  'lgPage:before:[&:not(:first-child)]:content-[""]',
  'lgPage:before:bg-gray-600 lgPage:before:inline-block',
  'lgPage:before:h-2 lgPage:before:mx-2 lgPage:before:w-[1px]'
)
const bgClasses = 'lgPage:hover:bg-transparent lgPage:focus:bg-transparent'
const textColorClasses = 'lgPage:hover:text-gray-400 lgPage:hover:text-white'

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
          icon && 'lgPage:[&_svg]:w-[1em]',
          props.selected && 'lgPage:bg-transparent lgPage:text-white',
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
