import React, { FC } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoScrollMenuFooter'
})

const ScrollMenuFooter: FC<BaseProps> = ({
  className,
  children,
  'data-testid': dataTestId,
  style
}) => {
  const classes = useStyles()

  return (
    <div
      data-testid={dataTestId}
      style={style}
      className={cx(classes.root, className)}
    >
      {children}
    </div>
  )
}

export default ScrollMenuFooter
