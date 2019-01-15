import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIMenuItem from '@material-ui/core/MenuItem'

import styles from './styles'

const MenuItem = props => {
  return <MUIMenuItem {...props} />
}

export default withStyles(styles.MenuItem)(MenuItem)
