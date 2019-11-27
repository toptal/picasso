import React, { FunctionComponent, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIList from '@material-ui/core/List'
import { StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

interface Props extends StandardProps, HTMLAttributes<HTMLUListElement> {}

const List: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  ...rest
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MUIList {...rest} classes={classes} className={className} style={style} />
)

export default withStyles(styles)(List)
