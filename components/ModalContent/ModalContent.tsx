import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

import styles from './styles'

interface Props {
  classes: Partial<ClassNameMap<string>>
}

const ModalContent: React.FunctionComponent<Props> = props => {
  const { children, classes } = props

  return <div className={classes.root}>{children}</div>
}

export default withStyles(styles)(ModalContent)
