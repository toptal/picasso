import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import FormHint from '../FormHint'
import FormError from '../FormError'
import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  /** The text of the hint */
  hint?: string
  /** The text of the error */
  error?: string
  /** The content of the Form.Field */
  children: ReactNode
}

export const FormField: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  hint,
  children,
  error
}) => (
  <div className={cx(classes.root, className)} style={style}>
    {children}
    {error && <FormError>{error}</FormError>}
    {hint && (
      <FormHint
        className={cx({
          [classes.noTopMargin]: error
        })}
      >
        {hint}
      </FormHint>
    )}
  </div>
)

FormField.defaultProps = {}

FormField.displayName = 'FormField'

export default withStyles(styles)(FormField)
