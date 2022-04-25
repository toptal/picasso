import React, { ReactNode } from 'react'
import cx from 'classnames'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { BaseProps, SizeType } from '@toptal/picasso-shared'

import { Typography } from '../..'
import styles from './styles'
import type { AvatarSizeType } from '../Avatar'

interface Props extends BaseProps {
  children: ReactNode
  fontSize?: SizeType<'small' | 'large'>
  size: AvatarSizeType
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTextAvatar'
})

const TextAvatar = ({
  children,
  className,
  style,
  'data-testid': dataTestID,
  fontSize,
  size
}: Props) => {
  const classes = useStyles()

  return (
    <div
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      className={cx(classes.root, className, classes[size!])}
      style={style}
    >
      <Typography
        data-testid={dataTestID}
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        className={classes[`${fontSize!}Font`]}
        invert
      >
        {children}
      </Typography>
    </div>
  )
}

TextAvatar.defaultProps = {
  size: 'large'
}

export default TextAvatar
