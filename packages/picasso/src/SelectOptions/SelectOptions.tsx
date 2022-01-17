import { makeStyles, Theme } from '@material-ui/core/styles'
import React, { FunctionComponent } from 'react'
import cx from 'classnames'

import ScrollMenu, { ScrollMenuProps } from '../ScrollMenu'
import styles from './styles'

export interface Props extends ScrollMenuProps {}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSelectOptions'
})

const SelectOptions: FunctionComponent<Props> = props => {
  const {
    selectedIndex,
    onBlur,
    children,
    style,
    fixedHeader,
    fixedFooter,
    className,
    role = 'menu',
    ...rest
  } = props
  const classes = useStyles()

  return (
    <ScrollMenu
      className={cx(className, classes.menu, {
        [classes.withHeader]: Boolean(fixedHeader),
        [classes.withFooter]: Boolean(fixedFooter)
      })}
      style={style}
      selectedIndex={selectedIndex}
      fixedFooter={fixedFooter}
      fixedHeader={fixedHeader}
      onBlur={onBlur}
      role={role}
      {...rest}
    >
      {children}
    </ScrollMenu>
  )
}

export default SelectOptions
