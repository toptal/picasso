import React, { ReactNode } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, SizeType } from '@toptal/picasso-shared'
import cx from 'classnames'

import styles from './styles'

export interface Props extends BaseProps {
  children: ReactNode
  size: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>
  variant: 'square' | 'portrait' | 'landscape'
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoAvatarWrapper'
})

const AvatarWrapper = (props: Props) => {
  const { children, className, style, 'data-testid': dataTestId } = props
  const classes = useStyles(props)

  return (
    <div
      style={style}
      data-testid={dataTestId}
      className={cx(className, classes.root, classes.size, classes.corner)}
    >
      {children}
    </div>
  )
}

export default AvatarWrapper
