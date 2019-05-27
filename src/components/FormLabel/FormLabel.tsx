import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import InputLabel from '../InputLabel'
import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps {
  /** Content of the label */
  children: string
  /** Adds asteriks if true */
  required?: boolean
  /** Is this label for disabled input or not */
  disabled?: boolean
  /** Specifies an id of the input */
  htmlFor?: string

  variant?: 'control' | 'field'
}

export const FormLabel: FunctionComponent<Props> = ({
  children,
  required,
  disabled,
  htmlFor,
  classes,
  className,
  style,
  variant
}) => {
  return (
    <InputLabel
      htmlFor={htmlFor}
      className={cx(
        className,
        classes.root,
        {
          [classes.disabled]: disabled
        },
        classes[variant!]
      )}
      style={style}
    >
      {required && <span className={classes.asterisk}>*</span>}
      {children}
    </InputLabel>
  )
}

FormLabel.defaultProps = {
  variant: 'field'
}

FormLabel.displayName = 'FormLabel'

export default withStyles(styles)(FormLabel)
