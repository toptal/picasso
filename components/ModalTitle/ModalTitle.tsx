import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

import Typography from '../Typography'
import styles from './styles'

interface Props {
  classes: Partial<ClassNameMap<string>>
}

const ModalTitle: React.FunctionComponent<Props> = props => {
  const { children, classes } = props

  return (
    <div className={classes.root}>
      <Typography variant='h3' weight='light'>
        {children}
      </Typography>
    </div>
  )
}

export default withStyles(styles)(ModalTitle)
