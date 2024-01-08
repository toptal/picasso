import type { ReactNode } from 'react'
import React from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'

import styles from './styles'

interface Props extends BaseProps {
  children: ReactNode
  fontSize?: SizeType<'small' | 'large'>
  size: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTextAvatar',
})

const TextAvatar = ({
  children,
  className,
  style,
  'data-testid': dataTestID,
  fontSize,
  size,
  'data-private': dataPrivate,
}: Props) => {
  const classes = useStyles()

  return (
    <div
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      className={cx(classes.root, className, classes[size!])}
      style={style}
      data-private={dataPrivate}
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
  size: 'large',
}

export default TextAvatar
