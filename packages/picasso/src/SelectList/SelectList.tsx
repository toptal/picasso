import MUIMenuList, { MenuListProps } from '@material-ui/core/MenuList'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  BaseProps,
  CompoundedComponentWithRef,
  PicassoComponentWithRef
} from '@toptal/picasso-shared'
import React, { forwardRef, HTMLAttributes } from 'react'

import SelectListItem from '../SelectListItem'
import styles from './styles'

export type SelectListAttributes = HTMLAttributes<HTMLUListElement> &
  Pick<MenuListProps, 'onKeyDown'>

export interface Props extends BaseProps, SelectListAttributes {}

export interface StaticProps {
  Item: typeof SelectListItem
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSelectList'
})

export const SelectList = forwardRef<HTMLUListElement, Props>(
  function SelectList (props, ref) {
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
  }
) as CompoundedComponentWithRef<Props, HTMLUListElement, StaticProps>

SelectList.displayName = 'SelectList'

SelectList.Item = SelectListItem

export default SelectList as PicassoComponentWithRef<
  Props,
  HTMLUListElement,
  StaticProps
>
