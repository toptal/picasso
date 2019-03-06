import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import { Classes } from '../styles/types'
import FormHint from '../FormHint'
import styles from './styles'

interface Props {
  classes: Classes
  hint?: string
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

export default withStyles(styles)(FormField)
