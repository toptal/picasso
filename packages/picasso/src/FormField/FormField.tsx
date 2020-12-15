import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps } from '@toptal/picasso-shared'

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

export const FormField = forwardRef<HTMLDivElement, Props>(function FormField(
  { classes, className, style, hint, children, error, ...rest },
  ref
) {
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

export default withStyles(styles)(FormField)
