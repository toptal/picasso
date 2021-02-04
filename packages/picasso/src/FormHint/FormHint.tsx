import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'

import Typography from '../Typography'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** The text of the hint */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, { name: 'FormHint' })

export const FormHint = forwardRef<HTMLDivElement, Props>(function FormHint(
  props,
  ref
) {
  const { children, className, style, ...rest } = props

  const classes = useStyles()

  return (
    <div
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
    >
      <Typography className={classes.hint}>{children}</Typography>
    </div>
  )
})

FormHint.defaultProps = {}

FormHint.displayName = 'FormHint'

export default FormHint
