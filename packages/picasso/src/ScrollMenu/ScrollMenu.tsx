import React, { ReactNode, RefObject, useRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import { useIsomorphicLayoutEffect } from '../utils'
import Menu from '../Menu'
import styles from './styles'

export interface Props extends BaseProps {
  children: React.ReactNode
  selectedIndex?: number | null
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  fixedHeader?: ReactNode
  fixedFooter?: ReactNode
  role?: 'listbox' | 'menu'
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoScrollMenu'
})

const getMenuSelectedNode = (
  menuRef: RefObject<HTMLDivElement>,
  selectedIndex?: number | null
) =>
  typeof selectedIndex === 'number'
    ? menuRef.current?.children[selectedIndex]
    : undefined

export const scrollToSelection = (
  menuRef: RefObject<HTMLDivElement>,
  selectedIndex?: number | null
) => {
  const menuNode = menuRef.current
  const selectedNode = getMenuSelectedNode(menuRef, selectedIndex)

  if (!menuNode || !selectedNode) {
    return
  }

  const menuRect = menuNode.getBoundingClientRect()
  const selectedRect = selectedNode.getBoundingClientRect()

  if (selectedRect.top < menuRect.top) {
    menuNode.scrollTop -= menuRect.top - selectedRect.top
  } else if (selectedRect.bottom > menuRect.bottom) {
    menuNode.scrollTop += selectedRect.bottom - menuRect.bottom
  }
}

const ScrollMenu = (props: Props) => {
  const {
    selectedIndex,
    onBlur,
    children,
    style,
    fixedHeader,
    fixedFooter,
    className,
    role,
    ...rest
  } = props
  const classes = useStyles()
  const menuRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(
    () => scrollToSelection(menuRef, selectedIndex),
    [selectedIndex]
  )

  return (
    <Menu
      className={cx(classes.menu, className)}
      style={style}
      role={role}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {fixedHeader}
      <div
        ref={menuRef}
        className={classes.scrollView}
        onBlur={onBlur}
        onMouseDown={e => {
          // ScrollMenu is used in dropdowns. Prevents blur --> dropdown close when scrolled.
          e.preventDefault()
        }}
      >
        {children}
      </div>
      {fixedFooter}
    </Menu>
  )
}

ScrollMenu.defaultProps = {
  role: 'menu'
}

ScrollMenu.displayName = 'ScrollMenu'

export default ScrollMenu
