import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import { Classes } from '../styles/types'
import Typography from '../Typography'
import styles from './styles'

interface Props {
  classes: Classes
  /** The text of the hint */
  children: React.ReactNode
}

export const FormHint: React.FunctionComponent<Props> = props => {
  const { children, classes, ...rest } = props

  return (
    <div className={classes.root} {...rest}>
      <Typography className={classes.hint}>{children}</Typography>
    </div>
  )
}

FormHint.defaultProps = {}

FormHint.displayName = 'FormHint'

export default withStyles(styles)(FormHint)
