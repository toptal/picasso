import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIList from '@material-ui/core/List'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {}

const List: FunctionComponent<Props> = ({ classes, className, style }) => (
  <MUIList classes={classes} className={className} style={style} />
)

export default withStyles(styles)(List)
