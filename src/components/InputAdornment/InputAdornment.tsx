import React, { ReactNode, FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIInputAdornment from '@material-ui/core/InputAdornment'

import { StandardProps } from '../Picasso'
import styles from './styles'

type PositionType = 'start' | 'end'

interface Props extends StandardProps {
  children: ReactNode
  position: PositionType
}

const InputAdornment: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  children,
  position
}) => {
  return (
    <MUIInputAdornment
      classes={classes}
      className={className}
      style={style}
      position={position}
    >
      {children}
    </MUIInputAdornment>
  )
}

export default withStyles(styles)(InputAdornment)
