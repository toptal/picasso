import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { mergeClasses, StandardProps } from '@toptal/picasso-shared'

import styles from './styles'
import Typography from '../Typography'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** The text of the error */
  children: ReactNode
}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoFormError' })

export const FormError = forwardRef<HTMLDivElement, Props>(function FormError(
  props,
  ref
) {
  const {
    children,
    classes: externalClasses,
    className,
    style,
    ...rest
  } = props

  const classes = mergeClasses(useStyles(props), externalClasses)

  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
    >
      <Typography className={classes.error}>{children}</Typography>
    </div>
  )
})

FormError.displayName = 'FormError'

export default FormError
