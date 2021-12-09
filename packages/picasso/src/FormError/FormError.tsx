import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'
import Typography from '../Typography'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** The text of the error */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoFormError' })

export const FormError = forwardRef<HTMLDivElement, Props>(function FormError(
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
      <Typography color='red' size='xxsmall' className={classes.error}>
        {children}
      </Typography>
    </div>
  )
})

FormError.displayName = 'FormError'

export default FormError
