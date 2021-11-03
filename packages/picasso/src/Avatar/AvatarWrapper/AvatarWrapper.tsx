import React, { FunctionComponent, ReactNode } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import styles from './styles'
import { AvatarSizeType, VariantType } from '../Avatar'

export interface Props extends BaseProps {
  children: ReactNode
  size: AvatarSizeType
  variant: VariantType
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoAvatarWrapper'
})

const AvatarWrapper: FunctionComponent<Props> = props => {
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
