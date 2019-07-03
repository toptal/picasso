import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIList from '@material-ui/core/List'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {}

const List: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  elementSelector
}) => (
  <MUIList
    classes={classes}
    className={className}
    style={style}
    data-qa={elementSelector}
  />
)

export default withStyles(styles)(List)
