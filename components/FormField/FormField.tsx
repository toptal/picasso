import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import { Classes } from '../styles/types'
import FormHint from '../FormHint'
import styles from './styles'

interface Props {
  classes: Classes
  /** The text of the hint */
  hint?: string
  /** The content of the Form.Field */
  children: React.ReactNode
}

export const FormField: React.FunctionComponent<Props> = props => {
  const { classes, hint, children, ...rest } = props

  return (
    <div className={classes.root} {...rest}>
      {children}
      {hint && <FormHint>{hint}</FormHint>}
    </div>
  )
}

FormField.defaultProps = {}

FormField.displayName = 'FormField'

export default withStyles(styles)(FormField)
