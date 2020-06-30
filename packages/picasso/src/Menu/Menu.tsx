import React, {
  HTMLAttributes,
  forwardRef,
  useState,
  useMemo,
  useContext,
  ReactElement,
  useCallback
} from 'react'
import MUIMenuList, { MenuListProps } from '@material-ui/core/MenuList'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  BaseProps,
  JssProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '@toptal/picasso-shared'

import { BackMinor16 } from '../Icon'
import Typography from '../Typography'
import MenuItem from '../MenuItem'
import MenuContext, { MenuContextProps } from './menuContext'
import styles from './styles'

export type ListNativeProps = HTMLAttributes<HTMLUListElement> &
  Pick<MenuListProps, 'onKeyDown'>

export interface Props extends BaseProps, ListNativeProps {
  // whether or not to handle nested navigation
  allowNestedNavigation?: boolean
}

export interface StaticProps {
  Item: typeof MenuItem
}

type Menus = Record<string, ReactElement>

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'Menu'
})

// eslint-disable-next-line react/display-name
export const Menu = forwardRef<HTMLUListElement, Props>(function Menu(
  props,
  ref
) {
  const classes = useStyles(props)
  const { children, className, style, allowNestedNavigation, ...rest } = props

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

  const menusKeys = useMemo(() => Object.keys(menus), [menus])

  const getLastKey = useCallback(() => menusKeys[menusKeys.length - 1], [
    menusKeys
  ])

  const refresh = useCallback(
    (key: string, newMenu: ReactElement) => {
      if (!menus[key]) {
        return
      }

      if (menus[key] !== newMenu) {
        setMenus({ ...menus, ...{ [key]: newMenu } })
      }
    },
    [menus]
  )

  const menuContext: MenuContextProps = useMemo(
    () => ({
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
      refresh
    }),
    [getLastKey, menus, refresh]
  )

  if (hasParentMenu) {
    return menu
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

export default Menu as PicassoComponentWithRef<
  Props & Partial<JssProps>,
  HTMLUListElement,
  StaticProps
>
