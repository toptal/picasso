import React, { FunctionComponent } from 'react'
import MUIList from '@material-ui/core/List'

import { StandardProps } from '../Picasso'

interface Props extends StandardProps {}

const List: FunctionComponent<Props> = ({ classes, className, style }) => (
  <MUIList classes={classes} className={className} style={style} />
)

export default List
