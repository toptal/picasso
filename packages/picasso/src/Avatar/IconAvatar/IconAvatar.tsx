import React from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'

import { Profile16 } from '../../Icon'
import styles from './styles'

interface Props extends BaseProps {
  size: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoIconAvatar',
})

const IconAvatar = ({
  size,
  'data-testid': dataTestId,
  className,
  style,
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
