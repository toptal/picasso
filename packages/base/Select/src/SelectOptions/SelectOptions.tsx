import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import cx from 'classnames'

import type { ScrollMenuProps } from '../ScrollMenu'
import { ScrollMenu } from '../ScrollMenu'
import styles from './styles'

export interface Props extends ScrollMenuProps {}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSelectOptions',
})

const SelectOptions = (props: Props) => {
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

  return (
    <ScrollMenu
      className={cx(
        classes.menu,
        {
          [classes.withHeader]: Boolean(fixedHeader),
          [classes.withFooter]: Boolean(fixedFooter),
        },
        className
      )}
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

SelectOptions.defaultProps = {
  role: 'menu',
}

SelectOptions.displayName = 'SelectOptions'

export default SelectOptions
