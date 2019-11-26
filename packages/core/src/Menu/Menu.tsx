import React, {
  HTMLAttributes,
  forwardRef,
  useState,
  useContext,
  ReactElement
} from 'react'
import MUIMenuList, { MenuListProps } from '@material-ui/core/MenuList'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  StandardProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '@toptal/picasso-shared'

import { BackMinor16 } from '../Icon'
import { Typography } from '../'
import MenuItem from '../MenuItem'
import MenuContext, { MenuContextProps } from './menuContext'
import styles from './styles'

export type ListNativeProps = HTMLAttributes<HTMLUListElement> &
  Pick<MenuListProps, 'onKeyDown'>

export interface Props extends StandardProps, ListNativeProps {
  // whether or not to handle nested navigation
  allowNestedNavigation?: boolean
}

export interface StaticProps {
  Item: typeof MenuItem
}

type Menus = Record<string, ReactElement>

// eslint-disable-next-line react/display-name
export const Menu = forwardRef<HTMLUListElement, Props>(function Menu(
  { children, className, classes, style, allowNestedNavigation, ...rest },
  ref
) {
  const { backButtonIcon, hideMenu, ...restClasses } = classes
  const { pop } = useContext<MenuContextProps>(MenuContext)

  const hasParentMenu = !!pop

  const handleBackClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation()

    pop!()
  }

  const menu = (
    <MUIMenuList
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      className={className}
      style={style}
      classes={restClasses}
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

  const [menus, setMenus] = useState<Menus>({})
  const menusKeys = Object.keys(menus)

  const getLastKey = () => menusKeys[menusKeys.length - 1]

  if (hasParentMenu) {
    return menu
  }

  const menuContext: MenuContextProps = {
    push: (key: string, newMenu: ReactElement) =>
      setMenus({ ...menus, ...{ [key]: newMenu } }),
    pop: () => {
      const key = getLastKey()

      if (!key) {
        return
      }

      const newMenus = { ...menus }

      delete newMenus[key]
      setMenus(newMenus)
    },
    refresh: (key: string, newMenu: ReactElement) => {
      if (!menus[key]) {
        return
      }

      setMenus({ ...menus, ...{ [key]: newMenu } })
    }
  }

  const currentVisibleMenuKey = getLastKey()
  const isRootMenuHidden = Boolean(currentVisibleMenuKey)

  return (
    <MenuContext.Provider value={menuContext}>
      {React.cloneElement(menu, {
        className: cx(menu.props.className, { [hideMenu]: isRootMenuHidden })
      })}
      {menusKeys.map((menuKey: string) =>
        React.cloneElement(menus[menuKey], {
          key: menuKey,
          className: cx(menus[menuKey].props.className, {
            [hideMenu]: menuKey !== currentVisibleMenuKey
          })
        })
      )}
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
