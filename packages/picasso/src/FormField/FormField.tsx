import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'

import FormHint from '../FormHint'
import FormError from '../FormError'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** The text of the hint */
  hint?: string
  /** The text of the error */
  error?: string
  /** The content of the Form.Field */
  children: ReactNode
  /** Field requirements for this specific field */
  fieldRequirements?: ReactNode
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoFormField' })

export const FormField = forwardRef<HTMLDivElement, Props>(function FormField(
  props,
  ref
) {
  const {
    className,
    style,
    hint,
    children,
    error,
    fieldRequirements,
    ...rest
  } = props

  const classes = useStyles()

  return (
    <div
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
      data-field-has-error={Boolean(error)}
    >
      {children}
      {error && <FormError className={classes.error}>{error}</FormError>}
      {hint && <FormHint className={classes.hint}>{hint}</FormHint>}
      {fieldRequirements}
    </div>
  )
})

FormField.defaultProps = {}

FormField.displayName = 'FormField'

export default FormField
