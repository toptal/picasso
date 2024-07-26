import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { BaseProps } from '@toptal/picasso-shared'
import { BackMinor16 } from '@toptal/picasso-icons'
import { Typography } from '@toptal/picasso-typography'

import { MenuItem } from '../MenuItem'
import { useMenu } from './hooks'
import MenuContext from './MenuContext'
import type { MenuVariant } from './types'

export interface Props extends BaseProps, HTMLAttributes<HTMLUListElement> {
  /** Switches between slide and drilldown variants */
  variant?: MenuVariant
  /** Whether or not to handle nested navigation */
  allowNestedNavigation?: boolean
  testIds?: {
    menuItem?: string
  }
}

export const Menu = forwardRef<HTMLUListElement, Props>(function Menu(
  props,
  ref
) {
  const {
    children,
    className,
    style,
    variant,
    allowNestedNavigation,
    testIds,
    role = 'menu',
    ...rest
  } = props
  const { context, innerMenu, hasBackButton } = useMenu({ variant })
  const { onBackClick, onMenuMouseLeave } = context

  let activeItemIndex = -1

  // Find the first selected or first non-disabled item
  React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return
    }

    if (process.env.NODE_ENV !== 'production') {
      // check if child is a fragment
      if (child.type === React.Fragment) {
        console.error(
          [
            "The Menu component doesn't accept a Fragment as a child.",
            'Consider providing an array instead.',
          ].join('\n')
        )
      }
    }

    if (!child.props.disabled) {
      if (child.props.selected) {
        activeItemIndex = index
      } else if (activeItemIndex === -1) {
        activeItemIndex = index
      }
    }
  })

  const items = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return
    }

    if (index === activeItemIndex) {
      const newChildProps: { tabIndex?: number } = {}

      if (child.props.tabIndex === undefined) {
        newChildProps.tabIndex = 0
      }

      return React.cloneElement(child, newChildProps)
    }

    return child
  })

  return (
    <MenuContext.Provider value={context}>
      {innerMenu ?? (
        <ul
          {...rest}
          ref={ref}
          className={twMerge(
            'relative list-none',
            'outline-none shadow-1',
            'py-2 px-0 m-0',
            'rounded-sm',
            className
          )}
          style={style}
          onMouseLeave={onMenuMouseLeave}
          role={role}
          tabIndex={-1}
        >
          {hasBackButton && allowNestedNavigation && (
            <MenuItem
              key='back'
              data-testid={testIds?.menuItem}
              onClick={onBackClick}
            >
              <Typography size='xsmall' color='dark-grey' variant='body'>
                <BackMinor16 className='-mt-[1px] mr-1 -ml-[5px] align-middle' />
                Back
              </Typography>
            </MenuItem>
          )}
          {items}
        </ul>
      )}
    </MenuContext.Provider>
  )
})

Menu.defaultProps = {
  variant: 'slide',
  allowNestedNavigation: true,
}

Menu.displayName = 'Menu'

export default Menu
