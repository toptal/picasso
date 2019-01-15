import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIList from '@material-ui/core/List'

import styles from './styles'

const List = props => {
  return <MUIList {...props} />
}

export default withStyles(styles.List)(List)
