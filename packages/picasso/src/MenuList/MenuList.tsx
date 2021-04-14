import MUIMenuList, { MenuListProps } from '@material-ui/core/MenuList'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  BaseProps,
  CompoundedComponentWithRef,
  PicassoComponentWithRef
} from '@toptal/picasso-shared'
import React, { forwardRef, HTMLAttributes } from 'react'

import MenuListItem from '../MenuListItem'
import styles from './styles'

export type MenuListAttributes = HTMLAttributes<HTMLUListElement> &
  Pick<MenuListProps, 'onKeyDown'>

export interface Props extends BaseProps, MenuListAttributes {}

export interface StaticProps {
  Item: typeof MenuListItem
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoMenuList'
})

export const MenuList = forwardRef<HTMLUListElement, Props>(function MenuList (
  props,
  ref
) {
  const { children, className, style, ...rest } = props
  const classes = useStyles()

  return (
    <MUIMenuList
      {...rest}
      ref={ref}
      className={className}
      style={style}
      classes={classes}
    >
      {children}
    </MUIMenuList>
  )
}) as CompoundedComponentWithRef<Props, HTMLUListElement, StaticProps>

MenuList.displayName = 'MenuList'

MenuList.Item = MenuListItem

export default MenuList as PicassoComponentWithRef<
  Props,
  HTMLUListElement,
  StaticProps
>
