import React from 'react'
import cx from 'classnames'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { BaseProps } from '@toptal/picasso-shared'

import type { AvatarSizeType } from '../Avatar'
import { Profile16 } from '../..'
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
