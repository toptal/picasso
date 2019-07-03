import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import Typography from '../Typography'
import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps {
  /** Title content */
  children: ReactNode
}

export const ModalTitle: FunctionComponent<Props> = ({
  children,
  classes,
  className,
  style,
  elementSelector
}) => (
  <div
    className={cx(classes.root, className)}
    style={style}
    data-qa={elementSelector}
  >
    <Typography variant='heading' size='medium'>
      {children}
    </Typography>
  </div>
)

ModalTitle.displayName = 'ModalTitle'

export default withStyles(styles)(ModalTitle)
