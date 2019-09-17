import React, {
  HTMLAttributes,
  forwardRef,
  ReactElement,
  useState,
  useContext
} from 'react'
import MUIMenuList, { MenuListProps } from '@material-ui/core/MenuList'
import { withStyles } from '@material-ui/core/styles'

import { BackMinor16 } from '../Icon'
import { MenuContextProps } from './types'
import {
  StandardProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '../Picasso'
import styles from './styles'
import Typography from '../Typography'
/* eslint-disable */
export const MenuContext = React.createContext<MenuContextProps>(
  {} as MenuContextProps
)
import MenuItem from '../MenuItem'
/* eslint-enable */

export type ListNativeProps = HTMLAttributes<HTMLUListElement> &
  Pick<MenuListProps, 'onKeyDown'>

export interface Props extends StandardProps, ListNativeProps {
  /** whether or not to handle nested navigation */
  allowNestedNavigation?: boolean
}


export interface StaticProps {
  Item: typeof MenuItem
}

// eslint-disable-next-line react/display-name
export const Menu = forwardRef<HTMLUListElement, Props>(function Menu(
  { children, className, classes, style, allowNestedNavigation, ...rest },
  ref
) {
  const { backButtonIcon, ...restClasses } = classes
  const { pop } = useContext<MenuContextProps>(MenuContext)
  const hasParentMenu = !!pop

  const handleBackClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation()
    pop()
  }

  const menu = (
    <MUIMenuList
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      className={className}
      style={style}
      classes={restClasses}
      // eslint-disable-next-line react/jsx-props-no-spreading
    >
      {hasParentMenu && allowNestedNavigation && (
        <MenuItem onClick={handleBackClick} key='back'>
          <Typography size='small' color='dark-grey' variant='body'>
            <BackMinor16 className={backButtonIcon} />
            Back
          </Typography>
        </MenuItem>
      )}
      {children}
    </MUIMenuList>
  )

  const [menus, setMenus] = useState<ReactElement[]>([menu])

  if (hasParentMenu) {
    return menu
  }

  const menuContext = {
    push: menu => setMenus([...menus, menu]),
    pop: () => setMenus(menus.slice(0, -1))
  } as MenuContextProps

  return (
    <MenuContext.Provider value={menuContext}>
      {menus[menus.length - 1]}
    </MenuContext.Provider>
  )
}) as CompoundedComponentWithRef<Props, HTMLUListElement, StaticProps>

Menu.defaultProps = {
  allowNestedNavigation: true
}

Menu.displayName = 'Menu'

Menu.Item = MenuItem

export default withStyles(styles)(Menu) as PicassoComponentWithRef<
  Props,
  HTMLUListElement,
  StaticProps
>
