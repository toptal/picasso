import React from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'

import type { AvatarSizeType } from '../types'
import Profile16 from '../../Icon/Profile16'
import styles from './styles'

interface Props extends BaseProps {
  size: AvatarSizeType
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoIconAvatar'
})

const IconAvatar = ({
  size,
  'data-testid': dataTestId,
  className,
  style
}: Props) => {
  const classes = useStyles()

  return (
    <Profile16
      className={cx(className, classes.root, classes[`${size}Icon`])}
      color='white'
      data-testid={dataTestId}
      style={style}
    />
  )
}

export default IconAvatar
