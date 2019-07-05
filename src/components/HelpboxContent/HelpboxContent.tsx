import React, { ReactNode, FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import Typography from '../Typography'
import styles from './styles'

export interface Props extends StandardProps {
  /** Content of Helpbox */
  children: ReactNode
}

export const HelpboxContent: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  children
}) => (
  <Typography
    classes={classes}
    className={className}
    style={style}
    variant='body'
    size='medium'
    color='grey'
  >
    {children}
  </Typography>
)

HelpboxContent.defaultProps = {}

HelpboxContent.displayName = 'HelpboxContent'

export default withStyles(styles)(HelpboxContent)
