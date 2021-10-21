import React, {
  FunctionComponent,
  ReactNode,
  useLayoutEffect,
  useRef
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, SizeType } from '@toptal/picasso-shared'
import cx from 'classnames'

import Menu from '../Menu'
import styles from './styles'
import scrollToSelection from './utils/scrollToSelection'
import ScrollMenuHeader from './ScrollMenuHeader/ScrollMenuHeader'
import ScrollMenuFooter from './ScrollMenuFooter/ScrollMenuFooter'

export interface Props extends BaseProps {
  fixedFooter?: ReactNode
  fixedHeader?: ReactNode
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  role?: 'listbox' | 'menu'
  selectedIndex?: number | null
  size?: SizeType<'small' | 'medium'>
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoScrollMenu'
})

const ScrollMenu: FunctionComponent<Props> = props => {
  const {
    selectedIndex,
    onBlur,
    children,
    style,
    fixedHeader,
    fixedFooter,
    role = 'menu',
    size = 'medium',
    ...rest
  } = props
  const classes = useStyles()
  const menuRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => scrollToSelection(menuRef, selectedIndex), [
    selectedIndex
  ])

  return (
    <Menu
      className={cx(classes.menu, classes[size])}
      role={role}
      style={style}
      {...rest}
    >
      {fixedHeader}
      <div ref={menuRef} className={classes.scrollView} onBlur={onBlur}>
        {children}
      </div>
      {fixedFooter}
    </Menu>
  )
}

export default Object.assign(ScrollMenu, {
  Header: ScrollMenuHeader,
  Footer: ScrollMenuFooter
})
