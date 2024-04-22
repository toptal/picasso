import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
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
    ...rest
  } = props
  const { context, innerMenu, hasBackButton } = useMenu({ variant })
  const { onBackClick, onMenuMouseLeave } = context

  return (
    <MenuContext.Provider value={context}>
      {innerMenu ?? (
        <ul
          {...rest}
          ref={ref}
          className={twMerge(
            'relative list-none',
            'outline-none shadow-2',
            'py-2 px-0 m-0',
            'rounded-sm',
            className
          )}
          style={style}
          onMouseLeave={onMenuMouseLeave}
        >
          {hasBackButton && allowNestedNavigation && (
            <MenuItem
              key='back'
              data-testid={testIds?.menuItem}
              onClick={onBackClick}
            >
              <Typography size='xsmall' color='dark-grey' variant='body'>
                <BackMinor16 className='mt-[-1px] mr-1 ml-[-5px] align-middle' />
                Back
              </Typography>
            </MenuItem>
          )}
          {children}
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
