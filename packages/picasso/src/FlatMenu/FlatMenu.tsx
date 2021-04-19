import React, {
  forwardRef,
  useState,
  useMemo,
  useContext,
  ReactElement,
  useCallback
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps, CompoundedComponentWithRef } from '@toptal/picasso-shared'

import { BackMinor16 } from '../Icon'
import MenuList, { MenuListAttributes } from '../MenuList'
import Typography from '../Typography'
import FlatMenuItem from '../FlatMenuItem'
import FlatMenuContext, { FlatMenuContextProps } from './FlatMenuContext'
import styles from './styles'

export interface Props extends BaseProps, MenuListAttributes {
  // whether or not to handle nested navigation
  allowNestedNavigation?: boolean
}

export interface StaticProps {
  Item: typeof FlatMenuItem
}

type Menus = Record<string, ReactElement>

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoFlatMenu'
})

export const FlatMenu = forwardRef<HTMLUListElement, Props>(function FlatMenu (
  props,
  ref
) {
  const {
    children,
    className,
    style,
    allowNestedNavigation = true,
    ...rest
  } = props
  const {
    backButtonIcon: backButtonIconClass,
    hideMenu: hideMenuClass
  } = useStyles()

  const { pop } = useContext<FlatMenuContextProps>(FlatMenuContext)

  const hasParentMenu = !!pop

  const handleBackClick = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      event.stopPropagation()
      if (pop) {
        pop()
      }
    },
    [pop]
  )

  const menu = (
    <MenuList {...rest} ref={ref} className={className} style={style}>
      {hasParentMenu && allowNestedNavigation && (
        <FlatMenuItem
          key='back'
          onClick={handleBackClick}
          data-testid='menu-back'
        >
          <Typography size='small' color='dark-grey' variant='body'>
            <BackMinor16 className={backButtonIconClass} />
            Back
          </Typography>
        </FlatMenuItem>
      )}
      {children}
    </MenuList>
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

  const menuContext: FlatMenuContextProps = useMemo(
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
    <FlatMenuContext.Provider value={menuContext}>
      {React.cloneElement(menu, {
        className: cx(menu.props.className, {
          [hideMenuClass]: isRootMenuHidden
        })
      })}
      {menusKeys.map((menuKey: string) =>
        React.cloneElement(menus[menuKey], {
          key: menuKey,
          className: cx(menus[menuKey].props.className, {
            [hideMenuClass]: menuKey !== currentVisibleMenuKey
          })
        })
      )}
    </FlatMenuContext.Provider>
  )
}) as CompoundedComponentWithRef<Props, HTMLUListElement, StaticProps>

FlatMenu.displayName = 'FlatMenu'

FlatMenu.Item = FlatMenuItem

export default FlatMenu
