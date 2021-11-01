import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import styles from './styles'
import { AvatarSizeType } from '../Avatar'

interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  size: AvatarSizeType
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAvatarWrapper'
})

const AvatarWrapper: FunctionComponent<Props> = ({
  children,
  size,
  ...rest
}: Props) => {
  const classes = useStyles()

  return (
    <div {...rest} className={cx(classes.root, classes[size])}>
      {children}
    </div>
  )
}

export default AvatarWrapper
