import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import { Classes } from '../styles/types'
import Typography from '../Typography'
import styles from './styles'

interface Props {
  classes: Classes
}

const FormHint: React.FunctionComponent<Props> = props => {
  const { children, classes, ...rest } = props

  return (
    <div className={classes.root} {...rest}>
      <Typography className={classes.hint}>{children}</Typography>
    </div>
  )
}

FormHint.defaultProps = {}

export default withStyles(styles)(FormHint)
