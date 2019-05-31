import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
import Typography from '../Typography'

export interface Props extends StandardProps {
  /** The text of the error */
  children: ReactNode
}

export const FormError: FunctionComponent<Props> = ({ children, classes }) => {
  return (
    <div className={classes.root}>
      <Typography className={classes.error}>{children}</Typography>
    </div>
  )
}

FormError.displayName = 'FormError'

export default withStyles(styles)(FormError)
