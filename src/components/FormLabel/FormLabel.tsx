import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import InputLabel from '../InputLabel'
import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps {
  children: string
  required?: boolean
  disabled?: boolean
  error?: boolean
  htmlFor?: string
}

export const FormLabel: FunctionComponent<Props> = ({
  children,
  required,
  disabled,
  error,
  htmlFor,
  classes,
  className,
  style
}) => {
  return (
    <InputLabel
      htmlFor={htmlFor}
      className={cx(className, classes.root, {
        [classes.error]: error,
        [classes.disabled]: disabled,
        [classes.required]: required
      })}
      style={style}
    >
      {children}
    </InputLabel>
  )
}

FormLabel.defaultProps = {}

FormLabel.displayName = 'FormLabel'

export default withStyles(styles)(FormLabel)
