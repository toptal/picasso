import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { mergeClasses, StandardProps } from '@toptal/picasso-shared'

import FormHint from '../FormHint'
import FormError from '../FormError'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** The text of the hint */
  hint?: string
  /** The text of the error */
  error?: string
  /** The content of the Form.Field */
  children: ReactNode
}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoFormField' })

export const FormField = forwardRef<HTMLDivElement, Props>(function FormField(
  props,
  ref
) {
  const {
    classes: externalClasses,
    className,
    style,
    hint,
    children,
    error,
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
      data-field-has-error={Boolean(error)}
    >
      {children}
      {error && <FormError className={classes.error}>{error}</FormError>}
      {hint && <FormHint className={classes.hint}>{hint}</FormHint>}
    </div>
  )
})

FormField.defaultProps = {}

FormField.displayName = 'FormField'

export default FormField
