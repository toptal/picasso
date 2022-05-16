import React, { ReactNode } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, SizeType } from '@toptal/picasso-shared'

import Typography from '../../Typography'
import styles from './styles'

interface Props extends BaseProps {
  children: ReactNode
  fontSize?: SizeType<'small' | 'large'>
  size: SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>
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
