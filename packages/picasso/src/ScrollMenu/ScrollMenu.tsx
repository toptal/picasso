import React, {
  FunctionComponent,
  ReactNode,
  RefObject,
  useLayoutEffect,
  useRef
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'

import Menu from '../Menu'
import styles from './styles'

export interface Props extends BaseProps {
  selectedIndex?: number | null
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  fixedHeader?: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoScrollMenu'
})

export const scrollToSelection = (
  menuRef: RefObject<HTMLDivElement>,
  selectedIndex?: number | null
) => {
  if (!menuRef.current || selectedIndex == null) {
    return
  }

  const menuNode = menuRef.current
  const selectedNode = menuRef.current.children[selectedIndex]
  const menuRect = menuNode.getBoundingClientRect()
  const selectedRect = selectedNode.getBoundingClientRect()

  if (selectedRect.top < menuRect.top) {
    menuNode.scrollTop -= menuRect.top - selectedRect.top
  } else if (selectedRect.bottom > menuRect.bottom) {
    menuNode.scrollTop += selectedRect.bottom - menuRect.bottom
  }
}

const ScrollMenu: FunctionComponent<Props> = props => {
  const { selectedIndex, onBlur, children, style, fixedHeader, ...rest } = props
  const classes = useStyles()
  const menuRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => scrollToSelection(menuRef, selectedIndex), [
    selectedIndex
  ])

  return (
    <Menu
      className={classes.menu}
      style={style}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {fixedHeader}
      <div ref={menuRef} className={classes.scrollView} onBlur={onBlur}>
        {children}
      </div>
    </Menu>
  )
}

export default ScrollMenu
